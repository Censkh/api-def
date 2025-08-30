import type {
  ApiResponse,
  Body,
  ComputedRequestConfig,
  Params,
  Query,
  RequestConfig,
  RequestHost,
  RetryOptions,
  State,
} from "./ApiTypes";

import { EventResultType, RequestEvent } from "./ApiConstants";
import { inferResponseType, isAcceptableStatus, isNetworkError, resolvePathParams } from "./ApiUtils";
import type { EndpointMockingConfig } from "./MockingTypes";
import RequestContext from "./RequestContext";
import { type RequestError, RequestErrorCode, convertToRequestError, isRequestError } from "./RequestError";
import { textDecode } from "./TextDecoding";
import MockRequestBackend from "./backend/MockRequestBackend";
import retry from "./util/retry";
import type { RetryOptions as InternalRetryOptions, RetryFunction } from "./util/retry/interfaces";

const locks: Record<string, RequestContext> = {};
const runningOperations: Record<string, Promise<ApiResponse>> = {};

const MOCK_REQUEST_BACKEND = new MockRequestBackend();

export const submit = async <
  TResponse,
  TParams extends Params | undefined,
  TQuery extends Query | undefined,
  TBody extends Body | undefined,
  TState extends State,
>(
  host: RequestHost,
  config: RequestConfig<TParams, TQuery, TBody, TState>,
  mocking: EndpointMockingConfig<TResponse, TParams, TQuery, TBody, TState> | null | undefined,
): Promise<ApiResponse<TResponse>> => {
  const computedConfig: ComputedRequestConfig<TParams, TQuery, TBody, TState> = host.computeConfig(config);

  const backend = mocking ? MOCK_REQUEST_BACKEND : host.getRequestBackend();

  const context = new RequestContext<TResponse, TParams, TQuery, TBody, TState>(
    backend,
    host,
    computedConfig,
    resolvePathParams(host.path, config.params),
    mocking,
  );

  const { key } = context;

  // don't do this -- should only be for GET requests anyway and should be opt-in
  /*
  // if we are already running this request just return the same promise, no need to do it again
  const sameRequest = runningOperations[key];
  if (sameRequest) {
    return sameRequest;
  }
  */

  const { lock } = context.requestConfig || {};

  if (typeof lock === "string") {
    const lockedContext = locks[lock];
    if (lockedContext && lockedContext.id !== context.id) {
      lockedContext.cancel();
    }
    locks[lock] = context as any;
  }

  try {
    let response = await (runningOperations[key] = makeRequest(context as RequestContext<TResponse>));

    const successEventResult = await context.triggerEvent(RequestEvent.SUCCESS);
    if (successEventResult && successEventResult.type === EventResultType.RESPOND) {
      context.response = response = successEventResult.response;
    }

    delete runningOperations[key];
    return response;
  } catch (error) {
    delete runningOperations[key];
    throw error;
  } finally {
    if (typeof lock === "string") {
      delete locks[lock];
    }
  }
};

const parseRetryOptions = (retryConfig: number | false | RetryOptions | undefined): RetryOptions => {
  if (retryConfig && typeof retryConfig === "object") {
    return retryConfig;
  }

  if (typeof retryConfig === "number") {
    return { maxAttempts: retryConfig };
  }
  return { maxAttempts: 0 };
};

const makeRequest = async <R>(context: RequestContext<R>): Promise<ApiResponse<R>> => {
  const beforeSendEventResult = await context.triggerEvent(RequestEvent.BEFORE_SEND);
  if (beforeSendEventResult && beforeSendEventResult.type === EventResultType.RESPOND) {
    return (context.response = beforeSendEventResult.response);
  }

  // validation
  if (context.validation.query) {
    try {
      context.requestConfig.queryObject = context.validation.query.parse(context.requestConfig.queryObject) as any;
    } catch (error: any) {
      throw convertToRequestError({
        error: error,
        code: RequestErrorCode.VALIDATION_QUERY_VALIDATE_ERROR,
        context: context,
      });
    }
  }

  if (context.validation.body) {
    try {
      context.requestConfig.body = context.validation.body.parse(context.requestConfig.body) as any;
    } catch (error: any) {
      throw convertToRequestError({
        error: error,
        code: RequestErrorCode.VALIDATION_BODY_VALIDATE_ERROR,
        context: context,
      });
    }
  }

  const retryOptions = parseRetryOptions(context.requestConfig?.retry);

  const internalRetryOptions: InternalRetryOptions = {
    retries: retryOptions.maxAttempts,
    // assume most users won't want to tune the delay between retries
    minTimeout: retryOptions.minDelay ?? 200,
    maxTimeout: retryOptions.maxDelay ?? 1000,
    randomize: true,
  };
  context.stats.attempt = 0;

  const performRequest: RetryFunction<Promise<any>> = async (fnBail, attemptCount) => {
    context.stats.attempt++;

    try {
      const { promise, canceler } = context.backend.makeRequest(context);
      context.addCanceller(canceler);
      const response = await promise;
      const parsedResponse = (await parseResponse<R>(context, response))!;

      if (!isAcceptableStatus(parsedResponse.status, context.requestConfig.acceptableStatus)) {
        throw convertToRequestError({
          error: new Error(`[api-def] Invalid response status code '${parsedResponse.status}'`),
          response: parsedResponse,
          code: RequestErrorCode.REQUEST_INVALID_STATUS,
          context: context,
        });
      }

      context.response = parsedResponse;
      context.stats.endTimestamp = Date.now();
      return parsedResponse;
    } catch (rawError: any) {
      if (context.cancelled) {
        rawError.isCancelledRequest = true;
      }

      const error = await parseError(context, rawError);
      context.error = error;
      context.response = error.response;
      context.stats.endTimestamp = Date.now();

      const errorEventResult = await context.triggerEvent(RequestEvent.ERROR);
      if (errorEventResult?.type === EventResultType.RESPOND) {
        return errorEventResult.response;
      }

      // allow retry logic to handle network errors
      //const shouldNaturallyRetry = ApiUtils.isNetworkError(error);
      //if (shouldNaturallyRetry) {
      //  throw error;
      //}

      // if we have an event that tells us to retry, we must do it
      const forceRetry = errorEventResult?.type === EventResultType.RETRY;
      if (forceRetry) {
        return performRequest(fnBail, attemptCount);
      }

      // allow retry logic to handle
      if (!retryOptions.shouldRetry || retryOptions.shouldRetry(error)) {
        throw error;
      }

      // error is unrecoverable, bail
      const unrecoverableErrorEventResult = await context.triggerEvent(RequestEvent.UNRECOVERABLE_ERROR);
      if (unrecoverableErrorEventResult) {
        if (unrecoverableErrorEventResult.type === EventResultType.RESPOND) {
          return unrecoverableErrorEventResult.response;
        }
      }

      fnBail(error);
    }
  };

  const response = await retry(performRequest, internalRetryOptions);

  if (context.validation.response) {
    try {
      response.data = context.validation.response.parse(response.data) as any;
    } catch (error: any) {
      throw convertToRequestError({
        error: error,
        code: RequestErrorCode.VALIDATION_RESPONSE_VALIDATE_ERROR,
        context: context,
      });
    }
  }

  return response;
};

const parseResponse = async <R = any>(
  context: RequestContext,
  response: any,
  error?: boolean,
): Promise<ApiResponse<R> | null | undefined> => {
  if (response) {
    const parsedResponse = await context.backend.convertResponse<R>(context, response);

    const contentType = parsedResponse.headers.get("content-type");
    const inferredResponseType = inferResponseType(contentType);

    if (!error) {
      // expand to array buffer once we support that in inferResponseType
      if (inferredResponseType === "text" && context.responseType === "json") {
        throw convertToRequestError({
          error: new Error(
            `[api-def] Expected '${context.responseType}' response, got '${inferredResponseType}' (from 'Content-Type' of '${contentType}')`,
          ),
          code: RequestErrorCode.REQUEST_MISMATCH_RESPONSE_TYPE,
          response: parsedResponse,
          context: context,
        });
      }

      // transform arrayBuffer to json
      if (inferredResponseType === "arraybuffer" && context.responseType === "json") {
        if (parsedResponse.data && typeof parsedResponse.data === "object") {
          const data = response.data;
          if (data.constructor?.name === "ArrayBuffer") {
            try {
              const decodedData = (response.data = textDecode(data) as any);
              response.data = JSON.parse(decodedData);
            } catch (e) {
              throw convertToRequestError({
                error: new Error(
                  `[api-def] Expected '${context.responseType}' response, got '${inferredResponseType}' (from 'Content-Type' of '${contentType}')`,
                ),
                code: RequestErrorCode.REQUEST_MISMATCH_RESPONSE_TYPE,
                response: parsedResponse,
                context: context,
              });
            }
          }
        }
      }
    }

    return parsedResponse;
  }
  return response;
};

const parseError = async (context: RequestContext, rawError: Error) => {
  let error: RequestError;
  if (isRequestError(rawError)) {
    error = rawError;
  } else {
    const extractedResponse = await context.backend.extractResponseFromError(rawError);
    let errorResponse: ApiResponse | undefined | null = undefined;
    if (extractedResponse !== undefined) {
      errorResponse = await parseResponse(context, extractedResponse, true);
    }

    let code: string = isNetworkError(rawError)
      ? RequestErrorCode.REQUEST_NETWORK_ERROR
      : RequestErrorCode.MISC_UNKNOWN_ERROR;
    if (errorResponse) {
      if (!isAcceptableStatus(errorResponse.status, context.requestConfig.acceptableStatus)) {
        code = RequestErrorCode.REQUEST_INVALID_STATUS;
      }
    } else {
      if ((rawError as any).code === "ENOTFOUND" || (rawError as any).cause?.code === "ENOTFOUND") {
        code = RequestErrorCode.REQUEST_HOST_NAME_NOT_FOUND;
      }
    }

    const errorInfo = context.backend.getErrorInfo(rawError, errorResponse);
    error = convertToRequestError({
      error: rawError,
      response: errorResponse,
      code: code,
      context: context,
      ...errorInfo,
    });
  }
  return error;
};
