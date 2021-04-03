import RequestContext from "../RequestContext";
import {ApiResponse}  from "../ApiTypes";

export interface RequestOperation<R> {
  promise: Promise<R>;
  canceler: () => void;
}

export default interface RequestBackend<R = any> {
  makeRequest(context: RequestContext): RequestOperation<R>;

  convertResponse<T>(context: RequestContext, response: R, error?: boolean): Promise<ApiResponse<T>>;

  extractResponseFromError(
    error: Error,
  ): Promise<R | null | undefined>;
}
