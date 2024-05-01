import type { ApiResponse } from "../ApiTypes";
import type RequestContext from "../RequestContext";

export interface RequestOperation<R> {
  promise: Promise<R>;
  canceler: () => void;
}

export interface RequestBackendErrorInfo {
  code: string;
}

export type ConvertedApiResponse<T> = ApiResponse<T> & { __lowercaseHeaders?: any };

export default interface RequestBackend<R = any> {
  readonly id: string;

  makeRequest(context: RequestContext): RequestOperation<R>;

  convertResponse<T>(context: RequestContext, response: R): Promise<ConvertedApiResponse<T>>;

  extractResponseFromError(error: Error): Promise<R | null | undefined>;

  getErrorInfo(error: Error, response: ApiResponse | undefined | null): RequestBackendErrorInfo | undefined;
}
