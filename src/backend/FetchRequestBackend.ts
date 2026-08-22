import type { ApiResponse } from "../ApiTypes";
import type RequestContext from "../RequestContext";
import { convertToRequestError, RequestErrorCode } from "../RequestError";
import * as Utils from "../Utils";
import { type Fetch, getGlobal, getGlobalFetch } from "../Utils";
import type RequestBackend from "./RequestBackend";
import type { ConvertedApiResponse, RequestBackendErrorInfo, RequestOperation } from "./RequestBackend";
import { convertStandardResponse } from "./StandardResponse";
import {
  getGlobalWebSocketConstructor,
  makeWebSocketRequest,
  type WebSocketConstructor,
  type WebSocketResponse,
} from "./WebSocketRequest";

class FetchError extends Error {
  response?: Response;
}

class FetchNetworkError extends Error {
  readonly cause: unknown;

  constructor(error: unknown) {
    super(error instanceof Error ? error.message : String(error));
    this.name = "NetworkError";
    this.cause = error;
  }
}

type FetchBackendResponse = Response | WebSocketResponse;

export default class FetchRequestBackend implements RequestBackend<FetchBackendResponse> {
  fetch = getGlobalFetch();
  webSocketConstructor: WebSocketConstructor | undefined = getGlobalWebSocketConstructor();

  readonly id = "fetch";

  static isSupported(fetchLibrary: Fetch | undefined = getGlobalFetch()): boolean {
    return (
      typeof fetchLibrary === "function" &&
      typeof Request !== "undefined" &&
      typeof Response !== "undefined" &&
      typeof Headers !== "undefined"
    );
  }

  constructor(fetchLibrary?: Fetch, webSocketConstructor?: WebSocketConstructor) {
    if (fetchLibrary !== undefined) {
      this.fetch = fetchLibrary;

      // otherwise window throws illegal invocation
      if (fetchLibrary === getGlobalFetch()) {
        this.fetch = fetchLibrary.bind(getGlobal());
      }
    }
    if (webSocketConstructor !== undefined) {
      this.webSocketConstructor = webSocketConstructor;
    }
  }

  async extractResponseFromError(error: Error): Promise<FetchBackendResponse | null | undefined> {
    if ("response" in error) {
      const fetchError = error as FetchError;
      return fetchError.response ? fetchError.response : null;
    }
    return undefined;
  }

  async convertResponse<T>(
    context: RequestContext,
    response: FetchBackendResponse & {
      __text?: string;
    },
  ): Promise<ConvertedApiResponse<T>> {
    if (context.responseType !== "websocket") {
      return convertStandardResponse(context, response as Response);
    }

    const convertedResponse = {
      method: context.method,
      url: response.url,
      data: undefined as any,
      status: response.status,
      headers: response.headers,
      state: context.requestConfig.state,
      stats: context.stats,
    } satisfies ApiResponse<T>;

    const data = (response as WebSocketResponse).webSocket;
    if (!data) {
      throw convertToRequestError({
        error: new Error("[api-def] WebSocket response did not include a webSocket"),
        code: RequestErrorCode.REQUEST_MISMATCH_RESPONSE_TYPE,
        context,
        response: convertedResponse,
      });
    }
    convertedResponse.data = data;

    return convertedResponse;
  }

  makeRequest(context: RequestContext): RequestOperation<FetchBackendResponse> {
    if (!this.fetch) {
      throw new Error("[api-def] No fetch impl was provided to FetchRequestBackend");
    }
    const fetch = this.fetch;

    const { requestConfig } = context;
    // abort controller is a newer feature than fetch
    const abortController = AbortController && new AbortController();
    const abortSignal = abortController ? abortController.signal : undefined;
    let softAbort = false;
    let responded = false;

    if (context.responseType === "websocket") {
      responded = true;
      return makeWebSocketRequest(context, this.webSocketConstructor);
    }

    const body = context.getParsedBody();

    const bodyJsonify =
      body !== null && typeof body === "object" && !Utils.isFormDataLike(body) && !(body instanceof URLSearchParams);

    const headers = Utils.assign(
      {
        // logic from axios
        "Content-Type": bodyJsonify ? "application/json;charset=utf-8" : undefined,
      },
      requestConfig.headers,
    );

    const parsedHeaders = Object.keys(headers).reduce((parsedHeaders, key) => {
      const value = headers[key];
      if (value !== undefined) {
        parsedHeaders[key] = value;
      }
      return parsedHeaders;
    }, {} as any);

    const url = context.requestUrl;

    const fetchOptions: RequestInit = {
      method: context.method.toUpperCase(),
      body: bodyJsonify ? JSON.stringify(body) : (body as any),
      headers: parsedHeaders,
      signal: abortSignal,
      cache: requestConfig.browserCache,
    };

    if ("mode" in Request.prototype) {
      fetchOptions.mode = "cors";
    }

    if ("credentials" in Request.prototype) {
      fetchOptions.credentials = requestConfig.credentials;
    }

    if (requestConfig.debug) {
      console.log(`[api-def] Fetching '${url.href}' with options`, JSON.stringify(fetchOptions, null, 2));
    }

    const request = new Request(url.href, fetchOptions);

    if (requestConfig.credentials !== undefined && request.credentials !== requestConfig.credentials) {
      Object.defineProperty(request, "credentials", { value: requestConfig.credentials });
    }

    if (context.validation.bodyEncoding === "multipart/form-data" && Utils.isFormDataLike(body)) {
      const contentType = request.headers.get("content-type");
      if (!contentType?.toLowerCase().startsWith("multipart/form-data")) {
        throw new Error("[api-def] multipart/form-data requires a fetch-compatible FormData implementation");
      }
    }

    const promise: Promise<Response> = Promise.resolve()
      .then(() =>
        fetch(
          request,
          requestConfig.credentials === undefined ? undefined : { credentials: requestConfig.credentials },
        ),
      )
      .catch((error: unknown) => {
        throw new FetchNetworkError(error);
      })
      .then((response) => {
        responded = true;
        if (!response.ok) {
          const error = new FetchError("Fetch failed");
          error.response = response;
          throw error;
        }
        if (softAbort) {
          throw new Error("[api-def] Request was aborted");
        }
        return response;
      });
    return {
      promise: promise,
      canceler: abortSignal
        ? () => !responded && abortController.abort()
        : () => {
            softAbort = true;
          },
    };
  }

  getErrorInfo(_error: Error, _response: ApiResponse | undefined | null): RequestBackendErrorInfo | undefined {
    return undefined;
  }
}
