import RequestBackend, {RequestOperation} from "./RequestBackend";
import {ApiResponse}                      from "../ApiTypes";
import RequestContext                     from "../RequestContext";
import * as Utils                         from "../Utils";
import {Fetch, getGlobalFetch}            from "../Utils";
import {ResponseType}                     from "../ApiConstants";

class FetchError extends Error {
  response?: Response;
}

export default class FetchRequestBackend implements RequestBackend<Response> {
  fetch = getGlobalFetch();

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

  async convertResponse<T>(context: RequestContext, response: Response): Promise<ApiResponse<T>> {
    let data;
    if (context.responseType === ResponseType.Text) {
      data = await response.text();
    } else if (context.responseType === ResponseType.ArrayBuffer) {
      data = await response.arrayBuffer();
    } else if (context.responseType === ResponseType.Json) {
      data = await response.json();
    }
    return {
      data   : data,
      status : response.status,
      headers: response.headers as any,
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

    const url = new URL(path);
    if (computedConfig.query) {
      const queryKeys = Object.keys(computedConfig.query);
      for (let i = 0; i < queryKeys.length; i++) {
        const key = queryKeys[i];
        url.searchParams.append(
          key,
          computedConfig.query[key]?.toString() || "",
        );
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
        throw new Error("Request was aborted");
      }
      return response;
    });
    return {
      promise : promise,
      canceler: abortSignal
        ? () => !responded && abortController.abort()
        : () => {
          console.warn("Request aborted");
          softAbort = true;
        },
    };
  }
}
