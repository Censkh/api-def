import type { ApiResponse } from "./ApiTypes";
import type RequestContext from "./RequestContext";
import type { EnumOf } from "./Utils";

export const RequestErrorCode = {
  MISC_UNKNOWN_ERROR: "misc/unknown-error",
  REQUEST_NETWORK_ERROR: "request/network-error",
  REQUEST_HOST_NAME_NOT_FOUND: "request/host-name-not-found",
  REQUEST_INVALID_STATUS: "request/invalid-status",
  REQUEST_INVALID_CONFIG: "request/invalid-config",
  REQUEST_MISMATCH_RESPONSE_TYPE: "request/mismatch-response-type",

  VALIDATION_QUERY_VALIDATE_ERROR: "validation/query-validate-error",
  VALIDATION_PARAMS_VALIDATE_ERROR: "validation/params-validate-error",
  VALIDATION_BODY_VALIDATE_ERROR: "validation/body-validate-error",
  VALIDATION_RESPONSE_VALIDATE_ERROR: "validation/response-validate-error",
} as const;
export type RequestErrorCode = EnumOf<typeof RequestErrorCode>;

const REQUEST_ERROR_SYMBOL = "isApiDefError";

export interface RequestError extends Error {
  [REQUEST_ERROR_SYMBOL]: true;
  response: ApiResponse | undefined | null;
  code: string;
  attempts: number;
}

export const isRequestError = (error: any): error is RequestError => {
  if (!error) {
    return false;
  }
  if (typeof error !== "object") {
    return false;
  }
  return error[REQUEST_ERROR_SYMBOL] === true;
};

export interface RequestErrorConfig {
  error: Error;
  code: string;
  context: RequestContext;
  response?: ApiResponse | null;
}

export const convertToRequestError = (config: RequestErrorConfig): RequestError => {
  const { error, context, response, code } = config;

  const body = context.getParsedBody();
  if (error.constructor.name === "TypeError") {
    error.constructor = TypeError;
    Object.setPrototypeOf(error, TypeError.prototype);
  } else if (error.constructor.name === "Error") {
    error.constructor = Error;
    Object.setPrototypeOf(error, Error.prototype);
  }

  const resultError = Object.assign(error, {
    name: "RequestError",
    response: response,
    code: code,
    [REQUEST_ERROR_SYMBOL]: true as const,
    attempts: context.stats.attempt,
    request: {
      url: context.requestUrl.href,
      query: context.requestConfig.queryObject,
      headers: context.requestConfig.headers,
      body: body,
    },
  });

  try {
    Object.defineProperty(resultError, "message", {
      value: `Request to '${context.requestUrl.href}' failed${response?.status ? ` with status code ${response.status}` : ""} [${code}]: ${
        resultError.message
      }`,
    });
  } catch (e) {
    // ignore
  }

  (resultError as any).config = undefined;
  (resultError as any).toJSON = undefined;

  return resultError;
};
