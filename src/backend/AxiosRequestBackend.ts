import RequestBackend, {ConvertedApiResponse, RequestBackendErrorInfo, RequestOperation} from "./RequestBackend";
import {ApiResponse}                                                                     from "../ApiTypes";
import type {AxiosError, AxiosResponse, AxiosStatic}               from "axios";
import RequestContext                                              from "../RequestContext";

let axios: AxiosStatic;

export const isAxiosError = (error: Error): error is AxiosError => {
  return "isAxiosError" in error;
};

export default class AxiosRequestBackend implements RequestBackend<AxiosResponse> {

  readonly id = "axios";

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(axiosLibrary: any) {
    axios = axiosLibrary;
  }

  async extractResponseFromError(
    error: Error,
  ): Promise<AxiosResponse | null | undefined> {
    if (isAxiosError(error)) {
      return error.response ? error.response : null;
    }
    return undefined;
  }

  async convertResponse<T>(context: RequestContext, response: AxiosResponse): Promise<ConvertedApiResponse<T>> {
    (response as ConvertedApiResponse<T>).__lowercaseHeaders = (response as any)._lowerCaseResponseHeaders;
    return response;
  }

  makeRequest(context: RequestContext): RequestOperation<AxiosResponse> {
    const {computedConfig} = context;

    let canceler: (() => void) | null = null;
    const promise: Promise<AxiosResponse> = axios({
      method          : context.method,
      baseURL         : context.baseUrl,
      url             : context.computedPath,
      data            : computedConfig.body || {},
      params          : computedConfig.query || {},
      headers         : computedConfig.headers || {},
      responseType    : context.responseType,
      cancelToken     : new axios.CancelToken((cancellerFunc) => {
        canceler = cancellerFunc;
      }),
      paramsSerializer: context.computedConfig.queryParser,
    });
    return {
      promise : promise,
      canceler: () => canceler && canceler(),
    };
  }

  getErrorInfo(error: Error, response: ApiResponse | undefined | null): RequestBackendErrorInfo | undefined {
    return undefined;
  }

}
