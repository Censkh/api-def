import {ApiResponse, RequestError, RequestEvent, RequestMiddleware,} from "../ApiTypes";
import RequestContext from "../RequestContext";
import * as ApiUtils from "../ApiUtils";

export const padNumber = (stringOrNumber: string | number, maxLength: number,): string => {
    const string = stringOrNumber.toString();
    return string.length >= maxLength
        ? string
        : "0".repeat(maxLength - string.length) + string;
};

export interface LoggingMiddlewareOptions {
    predicate?: () => boolean;
}

enum LogType {
    Info,
    Success,
    Error,
    Warn,
}

const COLOR_MAP: Record<LogType, string> = {
    [LogType.Error]: "#c8646c",
    [LogType.Info]: "#85a6c7",
    [LogType.Success]: "#a9c490",
    [LogType.Warn]: "#d19a66",
};

interface DiagnosedError {
    message: string;
    error?: RequestError;
    response?: ApiResponse;
    logType?: LogType;
}

const diagnoseError = (error: RequestError): DiagnosedError => {
    if (!error.response) {
        if (ApiUtils.isNetworkError(error)) {
            return {message: "network issue", error};
        }
        if (ApiUtils.isCancelledError(error)) {
            return {message: "cancelled", error};
        }

        return {message: "client-side error", error};
    }
    const {status, data} = error.response;
    const code = data?.code;
    return {
        message: `responded with ${status}${code ? ` (${code})` : ""}`,
        response: error.response,
    };
};

const formatTime = (time: Date): string => {
    return `${padNumber(time.getHours(), 2)}:${padNumber(
        time.getMinutes(),
        2,
    )}:${padNumber(time.getSeconds(), 2)}.${padNumber(
        time.getMilliseconds(),
        3,
    )}`;
};

const log = (
    context: RequestContext,
    type: LogType,
    message: string,
    options: LoggingMiddlewareOptions,
    objects?: Object,
) => {
    if (typeof options.predicate === "function" && !options.predicate()) {
        return;
    }

    const {computedPath} = context;

    const color = COLOR_MAP[type];

    const timestamp = formatTime(new Date());
    const args: string[] = [
        `%cnetwork %c[${
            context.api.name
        }] ${context.method.toUpperCase()} ${computedPath} %c${message} %c@ ${timestamp}`,
        "color:gray",
        "color:auto",
        `color:${color}`,
        "color:gray",
    ];
    /* eslint-disable-next-line no-console */
    console.groupCollapsed(...args);
    /* eslint-disable-next-line no-console */
    console.log(Object.assign({context: context}, objects || {}));
    /* eslint-disable-next-line no-console */
    console.groupEnd();
};

const LoggingMiddleware = (
    options: LoggingMiddlewareOptions = {},
): RequestMiddleware => {
    return {
        [RequestEvent.BeforeSend]: (context) => {
            log(
                context,
                LogType.Info,
                context.stats.attempt > 1 ? "retrying" : "sending",
                options,
            );
        },
        [RequestEvent.Success]: (context) => {
            const cacheSource = context.cacheInfo.source;

            log(
                context,
                LogType.Success,
                `responded with ${context.response?.status}${
                    cacheSource ? ` (cached by ${cacheSource})` : ""
                }`,
                options,
            );
        },
        [RequestEvent.Error]: (context) => {
            if (context.error) {
                const {error, message} = diagnoseError(context.error);
                log(
                    context,
                    LogType.Warn,
                    `error on attempt ${context.stats.attempt} - ${message}`,
                    options,
                    {error: error},
                );
            }
        },
        [RequestEvent.UnrecoverableError]: (context) => {
            if (context.error) {
                const {error, message} = diagnoseError(context.error);
                log(context, LogType.Error, `failed - ${message}`, options, {
                    error: error,
                });
            }
        },
    };
};

export default LoggingMiddleware;
