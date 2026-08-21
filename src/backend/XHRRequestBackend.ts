import type { ApiResponse } from "../ApiTypes";
import { inferResponseType } from "../ApiUtils";
import { createHeaders } from "../Headers";
import type RequestContext from "../RequestContext";
import { convertToRequestError, RequestErrorCode } from "../RequestError";
import * as Utils from "../Utils";
import type RequestBackend from "./RequestBackend";
import type { ConvertedApiResponse, RequestBackendErrorInfo, RequestOperation } from "./RequestBackend";
import {
  getGlobalWebSocketConstructor,
  makeWebSocketRequest,
  type WebSocketConstructor,
  type WebSocketResponse,
} from "./WebSocketRequest";

export type XMLHttpRequestConstructor = new () => XMLHttpRequest;

const getGlobalXMLHttpRequestConstructor = (): XMLHttpRequestConstructor | undefined => {
  return typeof XMLHttpRequest === "undefined" ? undefined : XMLHttpRequest;
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

const getHeaders = (xhr: XMLHttpRequest): Headers => {
  const headers = createHeaders();
  const rawHeaders = xhr.getAllResponseHeaders();

  for (const line of rawHeaders.trim().split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator !== -1) {
      headers.append(line.slice(0, separator).trim(), line.slice(separator + 1).trim());
    }
  }

  return headers;
};

class XHRNetworkError extends Error {
  readonly event: Event | undefined;

  constructor(message: string, event?: Event) {
    super(message);
    this.name = "NetworkError";
    this.event = event;
    (this as Error & { cause?: Event }).cause = event;
  }
}

type XHRBackendResponse = XMLHttpRequest | WebSocketResponse;

export default class XHRRequestBackend implements RequestBackend<XHRBackendResponse> {
  readonly id = "xhr";
  private readonly xhrConstructor: XMLHttpRequestConstructor | undefined;
  webSocketConstructor: WebSocketConstructor | undefined = getGlobalWebSocketConstructor();

  static isSupported(xhrConstructor = getGlobalXMLHttpRequestConstructor()): boolean {
    return typeof xhrConstructor === "function";
  }

  constructor(xhrConstructor = getGlobalXMLHttpRequestConstructor(), webSocketConstructor?: WebSocketConstructor) {
    this.xhrConstructor = xhrConstructor;
    if (webSocketConstructor !== undefined) {
      this.webSocketConstructor = webSocketConstructor;
    }
  }

  async extractResponseFromError(_error: Error): Promise<XHRBackendResponse | null | undefined> {
    return undefined;
  }

  async convertResponse<T>(context: RequestContext, response: XHRBackendResponse): Promise<ConvertedApiResponse<T>> {
    if (context.responseType === "websocket") {
      const webSocketResponse = response as WebSocketResponse;
      return {
        method: context.method,
        url: webSocketResponse.url,
        data: webSocketResponse.webSocket as any,
        headers: webSocketResponse.headers,
        status: webSocketResponse.status,
        state: context.requestConfig.state,
        stats: context.stats,
      };
    }

    const xhr = response as XMLHttpRequest;
    const headers = getHeaders(xhr);
    const responseType = context.responseType ?? inferResponseType(headers.get("content-type"));

    const convertedResponse = {
      method: context.method,
      url: xhr.responseURL || context.requestUrl.href,
      data: undefined as any,
      status: xhr.status,
      headers,
      state: context.requestConfig.state,
      stats: context.stats,
    } satisfies ApiResponse<T>;

    if (responseType === "stream") {
      throw convertToRequestError({
        error: new Error("[api-def] XMLHttpRequest does not support streaming responses"),
        code: RequestErrorCode.REQUEST_INVALID_CONFIG,
        context,
        response: convertedResponse,
      });
    }

    try {
      if (responseType === "arraybuffer") {
        convertedResponse.data = xhr.response;
      } else if (responseType === "json") {
        convertedResponse.data = JSON.parse(xhr.responseText);
      } else {
        convertedResponse.data = xhr.responseText;
      }
    } catch (error) {
      throw convertToRequestError({
        error: Object.assign(new Error(`[api-def] Failed to parse response as '${responseType}'`), { cause: error }),
        code: RequestErrorCode.REQUEST_MISMATCH_RESPONSE_TYPE,
        context,
        response: convertedResponse,
      });
    }

    return convertedResponse;
  }

  makeRequest(context: RequestContext): RequestOperation<XHRBackendResponse> {
    if (context.responseType === "websocket") {
      return makeWebSocketRequest(context, this.webSocketConstructor);
    }

    if (!this.xhrConstructor) {
      throw new Error("[api-def] No XMLHttpRequest implementation was provided to XHRRequestBackend");
    }

    const xhr = new this.xhrConstructor();
    const { requestConfig } = context;
    const body = context.getParsedBody();
    const bodyJsonify =
      body !== null && typeof body === "object" && !Utils.isFormDataLike(body) && !(body instanceof URLSearchParams);
    const headers = Utils.assign(
      {
        "Content-Type": bodyJsonify ? "application/json;charset=utf-8" : undefined,
      },
      getCacheHeaders(requestConfig.browserCache),
      requestConfig.headers,
    );

    let settled = false;
    const promise = new Promise<XMLHttpRequest>((resolve, reject) => {
      const complete = () => {
        if (settled) {
          return;
        }
        settled = true;
        resolve(xhr);
      };
      if ("onloadend" in (xhr as object)) {
        xhr.onloadend = complete;
      } else {
        xhr.onreadystatechange = () => {
          if (xhr.readyState !== 4 || (xhr.status === 0 && !xhr.responseURL.startsWith("file:"))) {
            return;
          }
          setTimeout(complete);
        };
      }
      xhr.onerror = (event) => {
        if (settled) {
          return;
        }
        settled = true;
        reject(new XHRNetworkError("[api-def] XMLHttpRequest network request failed", event));
      };
      xhr.onabort = (event) => {
        if (settled) {
          return;
        }
        settled = true;
        reject(new XHRNetworkError("[api-def] XMLHttpRequest request was aborted", event));
      };
      xhr.ontimeout = (event) => {
        if (settled) {
          return;
        }
        settled = true;
        reject(new XHRNetworkError("[api-def] XMLHttpRequest request timed out", event));
      };

      xhr.open(context.method.toUpperCase(), context.requestUrl.href, true);
      xhr.withCredentials = requestConfig.credentials === "include";
      if (context.responseType === "arraybuffer") {
        xhr.responseType = "arraybuffer";
      }

      for (const key of Object.keys(headers)) {
        const value = headers[key];
        if (value !== undefined && value !== null) {
          xhr.setRequestHeader(key, String(value));
        }
      }

      xhr.send(bodyJsonify ? JSON.stringify(body) : (body as XMLHttpRequestBodyInit | null | undefined));
    });

    return {
      promise,
      canceler: () => {
        if (!settled) {
          xhr.abort();
        }
      },
    };
  }

  getErrorInfo(_error: Error, _response: ApiResponse | undefined | null): RequestBackendErrorInfo | undefined {
    return undefined;
  }
}
