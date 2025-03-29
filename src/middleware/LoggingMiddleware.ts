import { RequestEvent } from "../ApiConstants";
import type { ApiResponse, RequestMiddleware } from "../ApiTypes";
import * as ApiUtils from "../ApiUtils";
import type RequestContext from "../RequestContext";
import type { RequestError } from "../RequestError";
import * as Utils from "../Utils";

export interface LoggingMiddlewareOptions {
  predicate?: () => boolean;
}

enum LogType {
  INFO = 0,
  SUCCESS = 1,
  ERROR = 2,
  WARNING = 3,
}

const COLOR_MAP: Record<LogType, string> = {
  [LogType.ERROR]: "#c8646c",
  [LogType.INFO]: "#85a6c7",
  [LogType.SUCCESS]: "#a9c490",
  [LogType.WARNING]: "#d19a66",
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
      return { message: "network issue", error };
    }
    if (ApiUtils.isCancelledError(error)) {
      return { message: "cancelled", error };
    }

    return { message: "client-side error", error };
  }
  const { status, data } = error.response;
  const code = data?.code;
  return {
    message: `responded with ${status}${code ? ` (${code})` : ""}`,
    response: error.response,
  };
};

const formatTime = (time: Date): string => {
  return `${Utils.padNumber(time.getHours(), 2)}:${Utils.padNumber(time.getMinutes(), 2)}:${Utils.padNumber(
    time.getSeconds(),
    2,
  )}.${Utils.padNumber(time.getMilliseconds(), 3)}`;
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

  const color = COLOR_MAP[type];

  const timestamp = formatTime(new Date());
  const args: string[] = [
    `%cnetwork %c[${context.api.name}] ${context.method.toUpperCase()} ${context.path} %c${message} %c@ ${timestamp}`,
    "color:gray",
    "color:auto",
    `color:${color}`,
    "color:gray",
  ];
  console.groupCollapsed(...args);
  console.log(Utils.assign({ context: context }, objects || {}));
  console.groupEnd();
};

const LoggingMiddleware = (config: LoggingMiddlewareOptions = {}): RequestMiddleware => {
  return {
    [RequestEvent.BEFORE_SEND]: (context) => {
      log(context, LogType.INFO, context.stats.attempt > 1 ? "retrying" : "sending", config);
    },
    [RequestEvent.SUCCESS]: (context) => {
      const cacheSource = context.cacheInfo.source;

      log(
        context,
        LogType.SUCCESS,
        `responded with ${context.response?.status}${cacheSource ? ` (cached by ${cacheSource})` : ""}`,
        config,
      );
    },
    [RequestEvent.ERROR]: (context) => {
      if (context.error) {
        const { error, message } = diagnoseError(context.error);
        log(context, LogType.WARNING, `error on attempt ${context.stats.attempt} - ${message}`, config, {
          error: error,
        });
      }
    },
    [RequestEvent.UNRECOVERABLE_ERROR]: (context) => {
      if (context.error) {
        const { error, message } = diagnoseError(context.error);
        log(context, LogType.ERROR, `failed - ${message}`, config, {
          error: error,
        });
      }
    },
  };
};

export default LoggingMiddleware;
