import RequestContext from "../RequestContext";
import {ApiResponse}  from "../ApiTypes";

export interface RequestOperation<R> {
  promise: Promise<R>;
  canceler: () => void;
}

export interface RequestBackendErrorInfo {
  code: string;
}

export default interface RequestBackend<R = any> {
  readonly id: string;

  makeRequest(context: RequestContext): RequestOperation<R>;

  convertResponse<T>(context: RequestContext, response: R, error?: boolean): Promise<ApiResponse<T>>;

  extractResponseFromError(
    error: Error,
  ): Promise<R | null | undefined>;

  getErrorInfo(
    error: Error,
    response: ApiResponse | undefined | null,
  ): RequestBackendErrorInfo | undefined;
}
