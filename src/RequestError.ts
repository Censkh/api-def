import {ApiResponse} from "./ApiTypes";
import {EnumOf}      from "./Utils";

export const RequestErrorCode = {
  MISC_UNKNOWN_ERROR    : "misc/unknown-error",
  REQUEST_NETWORK_ERROR : "request/network-error",
  REQUEST_INVALID_STATUS: "request/invalid-status",
  REQUEST_INVALID_CONFIG: "request/invalid-config",
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
  response?: ApiResponse | null;
}

export const convertToRequestError = (config: RequestErrorConfig): RequestError => {
  const {error, response, code} = config;
  return Object.assign(error, {
    name          : error.name === "Error" ? "RequestError" : error.name,
    response      : response,
    code          : code,
    isRequestError: true as const,
  });
};
