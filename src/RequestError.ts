import {ApiResponse} from "./ApiTypes";
import {EnumOf}      from "./Utils";

export const RequestErrorCode = {
  UNKNOWN_ERROR : "unknown-error",
  NETWORK_ERROR: "network-error",
  INVALID_STATUS: "invalid-status",
  INVALID_CONFIG: "invalid-config",
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

export const convertToRequestError = (config : RequestErrorConfig): RequestError => {
  const {error, response, code} = config;
  return Object.assign(error, {
    name: error.name === "Error" ? "RequestError" : error.name,
    response: response,
    code: code,
    isRequestError: true as const,
  });
};
