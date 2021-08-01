import {ApiResponse, Body, Params, Query, RequestConfig, RequestHost} from "./ApiTypes";

import * as ApiUtils                                                           from "./ApiUtils";
import {isAcceptableStatus, isNetworkError}                                    from "./ApiUtils";
import RequestContext                                                          from "./RequestContext";
import * as Api                                                                from "./Api";
import {EventResultType, RequestEvent}                                         from "./ApiConstants";
import retry                                                                   from "./util/retry";
import {RetryFunction, RetryOptions}                                           from "./util/retry/interfaces";
import MockRequestBackend                                                      from "./backend/MockRequestBackend";
import {EndpointMockingConfig}                                                 from "./MockingTypes";
import {convertToRequestError, isRequestError, RequestError, RequestErrorCode} from "./RequestError";

const locks: Record<string, RequestContext> = {};
const runningOperations: Record<string, Promise<ApiResponse>> = {};

const MOCK_REQUEST_BACKEND = new MockRequestBackend();

export const submit = async <R,
  P extends Params | undefined,
  Q extends Query | undefined,
  B extends Body | undefined>(
  host: RequestHost,
  config: RequestConfig<P, Q, B>,
  mocking: EndpointMockingConfig<R, P, Q, B> | null | undefined,
): Promise<ApiResponse<R>> => {
  const computedConfig: RequestConfig<P, Q, B> = host.computeConfig(config);

  const backend = mocking ? MOCK_REQUEST_BACKEND : Api.getRequestBackend();
  if (!backend) {
    throw new Error("[api-def] Please specify a backend you wish to use, this can be done either with 'setRequestBackend()'");
  }

  const context = new RequestContext<R, P, Q, B>(
    backend,
    host,
    computedConfig,
    host.computePath(host.path, config as RequestConfig),
    mocking,
  );

  // if we are already running this request just return the same promise, no need to do it again
  const {key} = context;
  const sameRequest = runningOperations[key];
  if (sameRequest) {
    return sameRequest;
  }

  const {lock} = context.computedConfig || {};

  if (lock) {
    const lockedContext = locks[lock];
    if (lockedContext && lockedContext.id !== context.id) {
      lockedContext.cancel();
    }
    locks[lock] = context as any;
  }

  try {
    let response = await (runningOperations[key] = makeRequest(
      context as RequestContext<R>,
    ));

    const successEventResult = await context.triggerEvent(RequestEvent.Success);
    if (
      successEventResult &&
      successEventResult.type === EventResultType.Respond
    ) {
      context.response = response = successEventResult.response;
    }

    delete runningOperations[key];
    return response;
  } catch (error) {
    delete runningOperations[key];
    throw error;
  } finally {
    if (lock) {
      delete locks[lock];
    }
  }
};

let defaultBackendMessageShown = false;

const makeRequest = async <R>(
  context: RequestContext<R>,
): Promise<ApiResponse<R>> => {
  if (process.env.NODE_ENV === "development") {
    if (Api.isRequestBackendDefault() && !defaultBackendMessageShown) {
      defaultBackendMessageShown = true;
      console.warn("[api-def] Using default fetch backend, you can use a different one with 'setRequestBackend()' (dev only message)");
    }
  }

  const beforeSendEventResult = await context.triggerEvent(RequestEvent.BeforeSend);
  if (
    beforeSendEventResult &&
    beforeSendEventResult.type === EventResultType.Respond
  ) {
    return (context.response = beforeSendEventResult.response);
  }

  const maxRetries = (context.computedConfig?.retry) || 0;

  const retryOpts: RetryOptions = {
    retries: maxRetries,
    // assume most users won't want to tune the delay between retries
    minTimeout: 1 * 1000,
    maxTimeout: 5 * 1000,
    randomize : true,
  };
  context.stats.attempt = 0;

  const performRequest: RetryFunction<Promise<any>> = async (fnBail, attemptCount) => {
    context.stats.attempt++;

    try {
      const {promise, canceler} = context.backend.makeRequest(context);
      context.addCanceller(canceler);
      const response = await promise;
      const parsedResponse = (await parseResponse<R>(context, response))!;

      if (!isAcceptableStatus(parsedResponse.status, context.computedConfig.acceptableStatus)) {
        throw convertToRequestError({
          error   : new Error(`[api-def] Invalid response status code '${parsedResponse.status}'`),
          response: parsedResponse,
          code    : RequestErrorCode.INVALID_STATUS,
        });
      }


      context.response = parsedResponse;
      return (parsedResponse);
    } catch (rawError) {
      if (context.cancelled) {
        rawError.isCancelledRequest = true;
      }

      const error = await parseError(context, rawError);
      context.error = error;
      context.response = error.response;

      // transform array buffer responses to objs
      if (context.response) {
        ApiUtils.parseResponseDataToObject(context.response);
      }

      const errorEventResult = await context.triggerEvent(RequestEvent.Error);
      if (errorEventResult?.type === EventResultType.Respond) {
        return errorEventResult.response;
      }

      // allow retry logic to handle network errors
      const shouldNaturallyRetry = ApiUtils.isNetworkError(error);
      if (shouldNaturallyRetry) {
        throw error;
      }

      // if we have an event that tells us to retry, we must do it
      const forceRetry = errorEventResult?.type === EventResultType.Retry;
      if (forceRetry) {
        return performRequest(fnBail, attemptCount);
      }

      // error is unrecoverable, bail
      const unrecoverableErrorEventResult = await context.triggerEvent(
        RequestEvent.UnrecoverableError,
      );
      if (unrecoverableErrorEventResult) {
        if (unrecoverableErrorEventResult.type === EventResultType.Respond) {
          return unrecoverableErrorEventResult.response;
        }
      }

      fnBail(error);
    }
  };

  const response = await retry(performRequest, retryOpts);

  return (response!);
};

const parseResponse = async <R = any>(context: RequestContext, response: any, error?: boolean): Promise<ApiResponse<R> | null | undefined> => {
  if (response) {
    const parsedResponse = await context.backend.convertResponse<R>(context, response, error);
    if (parsedResponse) {
      ApiUtils.parseResponseDataToObject(parsedResponse);
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

    let code: string = isNetworkError(rawError) ? RequestErrorCode.NETWORK_ERROR : RequestErrorCode.UNKNOWN_ERROR;
    if (errorResponse) {
      if (!isAcceptableStatus(errorResponse.status, context.computedConfig.acceptableStatus)) {
        code = RequestErrorCode.INVALID_STATUS;
      }
    }

    const errorInfo = context.backend.getErrorInfo(rawError, errorResponse);
    error = convertToRequestError({
      error   : rawError,
      response: errorResponse,
      code    : code,
      ...errorInfo,
    });
  }
  return error;
};
