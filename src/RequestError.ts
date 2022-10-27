import {ApiResponse}     from "./ApiTypes";
import {EnumOf}          from "./Utils";
import RequestContext    from "./RequestContext";

export const RequestErrorCode = {
  MISC_UNKNOWN_ERROR            : "misc/unknown-error",
  REQUEST_NETWORK_ERROR         : "request/network-error",
  REQUEST_INVALID_STATUS        : "request/invalid-status",
  REQUEST_INVALID_CONFIG        : "request/invalid-config",
  REQUEST_MISMATCH_RESPONSE_TYPE: "request/mismatch-response-type",
} as const;
export type RequestErrorCode = EnumOf<typeof RequestErrorCode>;

export interface RequestError extends Error {
  isRequestError: true;
  response: ApiResponse | undefined | null;
  code: string;
}

export const isRequestError = (error: Error): error is RequestError => {
  return "isRequestError" in error;
};

export interface RequestErrorConfig {
  error: Error;
  code: string;
  context: RequestContext,
  response?: ApiResponse | null;
}

export const convertToRequestError = (config: RequestErrorConfig): RequestError => {
  const {error, context, response, code} = config;

  const body = context.getParsedBody();

  const resultError = Object.assign(error, {
    name          : "RequestError",
    response      : response,
    code          : code,
    isRequestError: true as const,
    request       : {
      url    : context.getRequestUrl().href,
      query  : context.computedConfig.query,
      headers: context.computedConfig.headers,
      body   : body,
    },
  });

  delete (resultError as any).config;
  delete (resultError as any).toJSON;

  Object.setPrototypeOf(error, Error);

  return resultError;
};
