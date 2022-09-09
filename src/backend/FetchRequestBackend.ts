import RequestBackend, {ConvertedApiResponse, RequestBackendErrorInfo, RequestOperation} from "./RequestBackend";
import {ApiResponse}                                                                     from "../ApiTypes";
import RequestContext                                              from "../RequestContext";
import * as Utils                                                  from "../Utils";
import {Fetch, getGlobalFetch}                                     from "../Utils";
import {ResponseType}                                              from "../ApiConstants";
import {inferResponseType}                                         from "../ApiUtils";

class FetchError extends Error {
  response?: Response;
}

export default class FetchRequestBackend implements RequestBackend<Response> {
  fetch = getGlobalFetch();

  readonly id = "fetch";

  constructor(fetchLibrary?: Fetch) {
    if (fetchLibrary !== undefined) {
      this.fetch = fetchLibrary;
    }
  }

  async extractResponseFromError(
    error: Error,
  ): Promise<Response | null | undefined> {
    if ("response" in error) {
      const fetchError = error as FetchError;
      return fetchError.response ? fetchError.response : null;
    }
    return undefined;
  }

  async convertResponse<T>(context: RequestContext, response: Response & { __text?: string }): Promise<ConvertedApiResponse<T>> {
    const contentType = response.headers.get("Content-Type");
    const responseType = inferResponseType(contentType);

    if (!response.__text) {
      response.__text = await response.clone().text();
    }
    let data: any = response.__text;

    const {status, headers} = response;

    try {
      if (responseType === ResponseType.ArrayBuffer) {
        data = await response.clone().arrayBuffer();
      } else if (responseType === ResponseType.Json) {
        data = JSON.parse(response.__text);
      }
    } catch (error) {
      throw Object.assign(new Error(`[api-def] Invalid '${context.responseType}' response, got: '${response.__text}'`), {
        response,
      });
    }

    return {
      data   : data,
      status : status,
      headers: headers as any,
    };
  }

  makeRequest(context: RequestContext): RequestOperation<Response> {
    if (!this.fetch) {
      throw new Error("[api-def] No fetch impl was provided to FetchRequestBackend");
    }

    const {computedConfig} = context;

    let path = !context.baseUrl.endsWith("/")
      ? context.baseUrl + "/"
      : context.baseUrl;
    path += context.computedPath.startsWith("/")
      ? context.computedPath.substring(1)
      : context.computedPath;

    let origin: string | undefined = undefined;
    if (typeof window !== "undefined") {
      origin = window.origin;
    }

    const url = new URL(path, origin);
    if (computedConfig.query) {
      if (context.computedConfig.queryParser) {
        url.search = context.computedConfig.queryParser(computedConfig.query);
      } else {
        const queryKeys = Object.keys(computedConfig.query);
        for (let i = 0; i < queryKeys.length; i++) {
          const key = queryKeys[i];
          url.searchParams.append(
            key,
            computedConfig.query[key]?.toString() || "",
          );
        }
      }
    }

    // abort controller is a newer feature than fetch
    const abortController = AbortController && new AbortController();
    const abortSignal = abortController ? abortController.signal : undefined;
    let softAbort = false;
    let responded = false;

    const bodyJsonify = computedConfig.body !== null && typeof computedConfig.body === "object";

    const headers = Utils.assign({
      // logic from axios
      "Content-Type": bodyJsonify ? "application/json;charset=utf-8" : "application/x-www-form-urlencoded",
    }, computedConfig.headers);

    const parsedHeaders = Object.keys(headers).reduce((parsedHeaders, key) => {
      const value = headers[key];
      if (value !== undefined) {
        parsedHeaders[key] = value;
      }
      return parsedHeaders;
    }, {} as any);

    const promise: Promise<Response> = this.fetch(url.href, {
      method : context.method,
      body   : bodyJsonify ? JSON.stringify(computedConfig.body) : computedConfig.body as any,
      headers: parsedHeaders,
      mode   : "cors",
      signal : abortSignal,
    }).then((response) => {
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
      promise : promise,
      canceler: abortSignal
        ? () => !responded && abortController.abort()
        : () => {
          softAbort = true;
        },
    };
  }

  getErrorInfo(error: Error, response: ApiResponse | undefined | null): RequestBackendErrorInfo | undefined {
    return undefined;
  }
}
