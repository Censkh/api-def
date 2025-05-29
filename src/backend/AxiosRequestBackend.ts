import type { AxiosError, AxiosResponse, AxiosStatic } from "axios";
import type { ApiResponse } from "../ApiTypes";
import { inferResponseType } from "../ApiUtils";
import type RequestContext from "../RequestContext";
import type { ConvertedApiResponse, RequestBackendErrorInfo, RequestOperation } from "./RequestBackend";
import type RequestBackend from "./RequestBackend";

let axios: AxiosStatic;

export const isAxiosError = (error: Error): error is AxiosError => {
  return "isAxiosError" in error;
};

const getCacheHeaders = (browserCache?: RequestCache): Record<string, string> => {
  switch (browserCache) {
    case "no-store":
      return {
        "Cache-Control": "no-store",
        Pragma: "no-cache",
      };
    case "no-cache":
      return {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      };
    case "force-cache":
      return {
        "Cache-Control": "max-age=31536000",
      };
    case "only-if-cached":
      return {
        "Cache-Control": "only-if-cached",
      };
    default:
      return {};
  }
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
    const responseType = context.responseType ?? inferResponseType(response.headers["content-type"]);

    let data: any;
    if (responseType === "stream") {
      // For streaming responses, we create an async iterator from the response data
      if (!response.data) {
        throw new Error("[api-def] Response data is null for streaming response");
      }
      data = {
        async *[Symbol.asyncIterator]() {
          const stream = response.data;
          if (stream[Symbol.asyncIterator]) {
            yield* stream;
          } else if (stream.on) {
            // Handle Node.js streams
            yield* stream;
          } else {
            throw new Error("[api-def] Response data is not a valid stream");
          }
        },
      };
    } else {
      data = response.data;
    }

    return {
      method: context.method,
      url: response.request.res?.responseUrl ?? response.request?._redirectable?._currentUrl,
      data: data,
      headers: response.headers as any,
      status: response.status,
      state: context.requestConfig.state,
      __lowercaseHeaders: (response as any)._lowerCaseResponseHeaders,
      stats: context.stats,
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
      headers: {
        ...getCacheHeaders(requestConfig.browserCache),
        ...requestConfig.headers,
      },
      responseType: context.responseType,
      withCredentials: requestConfig.credentials === "include" || requestConfig.credentials === "same-origin",
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
