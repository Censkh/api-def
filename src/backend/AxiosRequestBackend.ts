import type { AxiosError, AxiosResponse, AxiosStatic } from "axios";
import type { ApiResponse } from "../ApiTypes";
import { inferResponseType, isOkStatus } from "../ApiUtils";
import type RequestContext from "../RequestContext";
import type RequestBackend from "./RequestBackend";
import type { ConvertedApiResponse, RequestBackendErrorInfo, RequestOperation } from "./RequestBackend";
import {
  getGlobalWebSocketConstructor,
  makeWebSocketRequest,
  type WebSocketConstructor,
  type WebSocketResponse,
} from "./WebSocketRequest";

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

type AxiosBackendResponse = AxiosResponse | WebSocketResponse;

export default class AxiosRequestBackend implements RequestBackend<AxiosBackendResponse> {
  readonly id = "axios";
  private readonly axios: AxiosStatic;
  webSocketConstructor: WebSocketConstructor | undefined = getGlobalWebSocketConstructor();

  static isSupported(axiosLibrary?: unknown): boolean {
    return typeof axiosLibrary === "function";
  }

  constructor(axiosLibrary: any, webSocketConstructor?: WebSocketConstructor) {
    this.axios = axiosLibrary;
    if (webSocketConstructor !== undefined) {
      this.webSocketConstructor = webSocketConstructor;
    }
  }

  async extractResponseFromError(error: Error): Promise<AxiosBackendResponse | null | undefined> {
    if (isAxiosError(error)) {
      return error.response ? error.response : null;
    }
    return undefined;
  }

  async convertResponse<T>(context: RequestContext, response: AxiosBackendResponse): Promise<ConvertedApiResponse<T>> {
    if (context.responseType === "websocket") {
      const webSocketResponse = response as WebSocketResponse;
      return {
        method: context.method,
        url: webSocketResponse.url,
        data: webSocketResponse.webSocket as any,
        headers: webSocketResponse.headers as any,
        status: webSocketResponse.status,
        ok: isOkStatus(webSocketResponse.status),
        state: context.requestConfig.state,
        stats: context.stats,
      };
    }

    const axiosResponse = response as AxiosResponse;
    const contentType = axiosResponse.headers["content-type"];
    const responseType =
      context.responseType ?? inferResponseType(contentType == null ? contentType : String(contentType));

    let data: any;
    if (responseType === "stream") {
      // For streaming responses, we create an async iterator from the response data
      if (!axiosResponse.data) {
        throw new Error("[api-def] Response data is null for streaming response");
      }
      data = {
        async *[Symbol.asyncIterator]() {
          const stream = axiosResponse.data;
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
      data = axiosResponse.data;
    }

    return {
      method: context.method,
      url: axiosResponse.request.res?.responseUrl ?? axiosResponse.request?._redirectable?._currentUrl,
      data: data,
      headers: axiosResponse.headers as any,
      status: axiosResponse.status,
      ok: isOkStatus(axiosResponse.status),
      state: context.requestConfig.state,
      __lowercaseHeaders: (axiosResponse as any)._lowerCaseResponseHeaders,
      stats: context.stats,
    };
  }

  makeRequest(context: RequestContext): RequestOperation<AxiosBackendResponse> {
    if (context.responseType === "websocket") {
      return makeWebSocketRequest(context, this.webSocketConstructor);
    }

    const { requestConfig } = context;
    const axios = this.axios;

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
      validateStatus: () => true,
      cancelToken: new axios.CancelToken((cancellerFunc) => {
        canceler = cancellerFunc;
      }),
    });
    return {
      promise: promise,
      canceler: () => canceler?.(),
    };
  }

  getErrorInfo(_error: Error, _response: ApiResponse | undefined | null): RequestBackendErrorInfo | undefined {
    return undefined;
  }
}
