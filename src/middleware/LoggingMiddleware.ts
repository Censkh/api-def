import {ApiResponse, RequestMiddleware} from "../ApiTypes";
import RequestContext                   from "../RequestContext";
import * as ApiUtils                    from "../ApiUtils";
import * as Utils                       from "../Utils";
import {RequestEvent}                   from "../ApiConstants";
import {RequestError}                   from "../RequestError";

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
  [LogType.Error]  : "#c8646c",
  [LogType.Info]   : "#85a6c7",
  [LogType.Success]: "#a9c490",
  [LogType.Warn]   : "#d19a66",
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
    message : `responded with ${status}${code ? ` (${code})` : ""}`,
    response: error.response,
  };
};

const formatTime = (time: Date): string => {
  return `${Utils.padNumber(time.getHours(), 2)}:${Utils.padNumber(
    time.getMinutes(),
    2,
  )}:${Utils.padNumber(time.getSeconds(), 2)}.${Utils.padNumber(
    time.getMilliseconds(),
    3,
  )}`;
};

const log = (
  context: RequestContext,
  type: LogType,
  message: string,
  config: LoggingMiddlewareOptions,
  objects?: Object,
) => {
  if (typeof config.predicate === "function" && !config.predicate()) {
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
  console.log(Utils.assign({context: context}, objects || {}));
  /* eslint-disable-next-line no-console */
  console.groupEnd();
};

const LoggingMiddleware = (
  config: LoggingMiddlewareOptions = {},
): RequestMiddleware => {
  return {
    [RequestEvent.BeforeSend]        : (context) => {
      log(
        context,
        LogType.Info,
        context.stats.attempt > 1 ? "retrying" : "sending",
        config,
      );
    },
    [RequestEvent.Success]           : (context) => {
      const cacheSource = context.cacheInfo.source;

      log(
        context,
        LogType.Success,
        `responded with ${context.response?.status}${
          cacheSource ? ` (cached by ${cacheSource})` : ""
        }`,
        config,
      );
    },
    [RequestEvent.Error]             : (context) => {
      if (context.error) {
        const {error, message} = diagnoseError(context.error);
        log(
          context,
          LogType.Warn,
          `error on attempt ${context.stats.attempt} - ${message}`,
          config,
          {error: error},
        );
      }
    },
    [RequestEvent.UnrecoverableError]: (context) => {
      if (context.error) {
        const {error, message} = diagnoseError(context.error);
        log(context, LogType.Error, `failed - ${message}`, config, {
          error: error,
        });
      }
    },
  };
};

export default LoggingMiddleware;
