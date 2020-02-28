import RequestContext from "../RequestContext";
import {ApiResponse} from "../ApiTypes";

export interface RequestOperation<T> {
    promise: Promise<ApiResponse<T>>;
    canceler: () => void;
}

export default interface RequestBackend<R = any, E extends Error = Error> {
    makeRequest<T>(context: RequestContext): RequestOperation<T>;

    convertResponse<T>(response: R): Promise<ApiResponse<T>>;

    extractResponseFromError(
        error: Error,
    ): Promise<ApiResponse | null | undefined>;
}
