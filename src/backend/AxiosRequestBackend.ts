import type { AxiosError, AxiosResponse, AxiosStatic } from "axios";
import type { ApiResponse } from "../ApiTypes";
import type RequestContext from "../RequestContext";
import type RequestBackend from "./RequestBackend";
import type { ConvertedApiResponse, RequestBackendErrorInfo, RequestOperation } from "./RequestBackend";

let axios: AxiosStatic;

export const isAxiosError = (error: Error): error is AxiosError => {
  return "isAxiosError" in error;
};

export default class AxiosRequestBackend implements RequestBackend<AxiosResponse> {
  readonly id = "axios";

  constructor(axiosLibrary: any) {
    axios = axiosLibrary;
  }

  async extractResponseFromError(error: Error): Promise<AxiosResponse | null | undefined> {
    if (isAxiosError(error)) {
      return error.response ? error.response : null;
    }
    return undefined;
  }

  async convertResponse<T>(context: RequestContext, response: AxiosResponse): Promise<ConvertedApiResponse<T>> {
    return {
      method: context.method,
      url: response.request.res.responseUrl,
      data: response.data,
      headers: response.headers as any,
      status: response.status,
      state: context.requestConfig.state,
      __lowercaseHeaders: (response as any)._lowerCaseResponseHeaders,
    };
  }

  makeRequest(context: RequestContext): RequestOperation<AxiosResponse> {
    const { requestConfig } = context;

    const url = context.requestUrl;

    let canceler: (() => void) | null = null;
    const promise: Promise<AxiosResponse> = axios({
      method: context.method,
      url: url.href,
      data: context.getParsedBody(),
      headers: requestConfig.headers || {},
      responseType: context.responseType,
      withCredentials: requestConfig.includeCredentials,
      cancelToken: new axios.CancelToken((cancellerFunc) => {
        canceler = cancellerFunc;
      }),
    });
    return {
      promise: promise,
      canceler: () => canceler?.(),
    };
  }

  getErrorInfo(error: Error, response: ApiResponse | undefined | null): RequestBackendErrorInfo | undefined {
    return undefined;
  }
}
