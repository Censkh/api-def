import {ApiResponse, Body, EventResultType, Params, Query, RequestConfig, RequestEvent, RequestHost,} from "./ApiTypes";

import * as ApiUtils from "./ApiUtils";
import RequestContext from "./RequestContext";
import * as Api from "./Api";

export const MAX_RETRIES = 5;

const locks: Record<string, RequestContext> = {};
const runningOperations: Record<string, Promise<ApiResponse>> = {};

export const submit = async <R,
    P extends Params | undefined,
    Q extends Query | undefined,
    B extends Body | undefined>(
    host: RequestHost,
    config: RequestConfig<P, Q, B>,
): Promise<ApiResponse<R>> => {
    const computedConfig: RequestConfig<P, Q, B> = host.computeConfig(config);

    const context = new RequestContext<R, P, Q, B>(
        host,
        computedConfig,
        host.computePath(host.path, config as RequestConfig),
    );

    // if we are already running this request just return the same promise, no need to do it again
    const {key} = context;
    const sameRequest = runningOperations[key];
    if (sameRequest) {
        return sameRequest;
    }

    const {lock} = context.computedConfig.options || {};

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

const makeRequest = async <R>(
    context: RequestContext<R>,
): Promise<ApiResponse<R>> => {
    const backend = Api.backend;
    if (!backend) {
        throw new Error("Please specify a backend you wish to use, this can be done either with 'apiDef.setBackend(AxiosBackend/FetchBackend)'")
    }

    context.stats.attempt++;

    const beforeSendEventResult = await context.triggerEvent(
        RequestEvent.BeforeSend,
    );
    if (
        beforeSendEventResult &&
        beforeSendEventResult.type === EventResultType.Respond
    ) {
        return (context.response = beforeSendEventResult.response);
    }

    try {
        const {promise, canceler} = backend.makeRequest<R>(context);
        context.addCanceller(canceler);
        const response = await promise;
        context.response = response;
        return response;
    } catch (error) {
        if (context.cancelled) {
            error.isCancelledRequest = true;
        }

        context.error = error;
        const errorResponse = await backend.extractResponseFromError(error);
        if (errorResponse !== undefined) {
            context.response = errorResponse;
            error.response = errorResponse;
        }

        // transform array buffer responses to objs
        if (context.response) {
            ApiUtils.parseResponseDataToObject(context.response);
        }

        const errorEventResult = await context.triggerEvent(RequestEvent.Error);
        if (errorEventResult?.type === EventResultType.Respond) {
            return errorEventResult.response;
        }

        const shouldRetry =
            errorEventResult?.type === EventResultType.Retry ||
            ApiUtils.isNetworkError(error);

        // retry request with same config
        if (shouldRetry && context.stats.attempt < MAX_RETRIES) {
            return makeRequest(context);
        }

        const unrecoverableErrorEventResult = await context.triggerEvent(
            RequestEvent.UnrecoverableError,
        );
        if (unrecoverableErrorEventResult) {
            if (unrecoverableErrorEventResult.type === EventResultType.Respond) {
                return unrecoverableErrorEventResult.response;
            }
        }
        throw error;
    }
};
