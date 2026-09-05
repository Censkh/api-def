import { EventResultType, RequestEvent } from "./ApiConstants";
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
import { inferResponseType, isAcceptableStatus, isNetworkError } from "./ApiUtils";
import MockRequestBackend from "./backend/MockRequestBackend";
import type { EndpointMockingConfig } from "./MockingTypes";
import RequestContext from "./RequestContext";
import { convertToRequestError, isRequestError, type RequestError, RequestErrorCode } from "./RequestError";
import { bindRequestTask, createRequestTask } from "./RequestTask";
import { textDecode } from "./TextDecoding";
import retry from "./util/retry";
import type { RetryOptions as InternalRetryOptions, RetryFunction } from "./util/retry/interfaces";

const locks: Record<string, RequestContext> = {};

const MOCK_REQUEST_BACKEND = new MockRequestBackend();

export const resolveUrl = async <
  TResponse,
  TParams extends Params | undefined,
  TQuery extends Query | undefined,
  TBody extends Body | undefined,
  TState extends State,
>(
  host: RequestHost,
  config: RequestConfig<TParams, TQuery, TBody, TState>,
  baseUrl?: string,
): Promise<URL> => {
  const context = new RequestContext<TResponse, TParams, TQuery, TBody, TState>(
    host.getRequestBackend(),
    host,
    host.computeConfig(config),
    host.path,
    null,
  );

  if (baseUrl !== undefined) {
    context.updateBaseUrl(baseUrl);
  }

  await context.triggerEvent(RequestEvent.BEFORE_SEND);
  return context.requestUrl;
};

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
    host.path,
    mocking,
  );

  createRequestTask(context, host.method, host.path);

  const { lock } = context.requestConfig || {};

  if (typeof lock === "string") {
    const lockedContext = locks[lock];
    if (lockedContext && lockedContext.id !== context.id) {
      lockedContext.cancel();
    }
    locks[lock] = context as any;
  }

  try {
    let response = await makeRequest(context as RequestContext<TResponse>);
    context.error = null;
    context.response = response;

    const successEventResult = await context.triggerEvent(RequestEvent.SUCCESS);
    if (successEventResult && successEventResult.type === EventResultType.RESPOND) {
      context.response = response = successEventResult.response;
    }

    return response;
  } catch (rawError: any) {
    const error = await setContextError(context, rawError);
    await context.triggerEvent(RequestEvent.ERROR);
    throw error;
  } finally {
    context.stats.endTimestamp = Date.now();
    if (typeof lock === "string" && locks[lock]?.id === context.id) {
      delete locks[lock];
    }
    await context.triggerEvent(RequestEvent.FINALLY);
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

  context.validatePath();

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
  context.parseBody();

  if (context.hasEventHandlers(RequestEvent.BEFORE_REQUEST)) {
    const beforeRequestEventResult = await context.triggerEvent(RequestEvent.BEFORE_REQUEST);
    if (beforeRequestEventResult && beforeRequestEventResult.type === EventResultType.RESPOND) {
      context.response = beforeRequestEventResult.response;
      assertAcceptableResponse(context, beforeRequestEventResult.response);
      return validateResponse(context, beforeRequestEventResult.response);
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
      assertAcceptableResponse(context, parsedResponse);

      context.error = null;
      context.response = parsedResponse;
      context.stats.endTimestamp = Date.now();
      return parsedResponse;
    } catch (rawError: any) {
      const error = await setContextError(context, rawError);
      const errorEventResult = await context.triggerEvent(RequestEvent.ATTEMPT_ERROR);
      if (errorEventResult?.type === EventResultType.RESPOND) {
        context.error = null;
        context.response = errorEventResult.response;
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
        return bindRequestTask(context, performRequest)(fnBail, attemptCount);
      }

      // allow retry logic to handle
      if (!retryOptions.shouldRetry || retryOptions.shouldRetry(error)) {
        throw error;
      }

      fnBail(error);
    }
  };

  const response = await retry(bindRequestTask(context, performRequest), internalRetryOptions);
  return validateResponse(context, response);
};

const assertAcceptableResponse = (context: RequestContext, response: ApiResponse): void => {
  const isDeclaredStatusResponse =
    context.validation.responses !== undefined &&
    Object.prototype.hasOwnProperty.call(context.validation.responses, response.status);
  const isAcceptableResponse =
    context.validation.responses === undefined
      ? isAcceptableStatus(response.status, context.requestConfig.acceptableStatus)
      : isDeclaredStatusResponse;

  if (!(context.responseType === "websocket" && response.status === 101) && !isAcceptableResponse) {
    throw convertToRequestError({
      error: new Error(`[api-def] Invalid response status code '${response.status}'`),
      response,
      code: RequestErrorCode.REQUEST_INVALID_STATUS,
      context,
    });
  }
};

const validateResponse = <R>(context: RequestContext<R>, response: ApiResponse<R>): ApiResponse<R> => {
  const responseValidation = context.validation.responses?.[response.status] ?? context.validation.response;
  if (responseValidation) {
    try {
      (response as any).data = responseValidation.parse(response.data) as R;
    } catch (error: any) {
      throw convertToRequestError({
        error,
        response,
        code: RequestErrorCode.VALIDATION_RESPONSE_VALIDATE_ERROR,
        context,
      });
    }
  }

  return response;
};

const setContextError = async (
  context: RequestContext<any, any, any, any, any>,
  rawError: Error,
): Promise<RequestError> => {
  if (context.cancelled) {
    (rawError as any).isCancelledRequest = true;
  }

  const error = await parseError(context, rawError);
  context.error = error;
  if (error.response !== undefined) {
    context.response = error.response;
  }
  context.stats.endTimestamp = Date.now();
  return error;
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
            } catch (_e) {
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
    let errorResponse: ApiResponse | undefined | null;
    if (extractedResponse !== undefined) {
      errorResponse = await parseResponse(context, extractedResponse, true);
    }

    let code: string = isNetworkError(rawError)
      ? RequestErrorCode.REQUEST_NETWORK_ERROR
      : RequestErrorCode.MISC_UNKNOWN_ERROR;
    if (!errorResponse) {
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
