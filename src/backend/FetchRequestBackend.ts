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

  inferResponseType(response:Response): ResponseType {
    const contentType = response.headers.get("Content-Type");
    if (contentType?.startsWith("json")) {
      return "json";
    }
    return "text";
}

  async convertResponse<T>(context: RequestContext, response: Response & {__text?: string}, error?: boolean): Promise<ApiResponse<T>> {
    let data;
    const responseType =  error ? this.inferResponseType(response) : context.responseType;

    try {
      if (!response.__text) {
        response.__text = await response.clone().text();
      }

      if (responseType === ResponseType.Text) {
        data = response.__text;
      } else if (responseType === ResponseType.ArrayBuffer) {
        data = await response.clone().arrayBuffer();
      } else if (responseType === ResponseType.Json) {
        data = JSON.parse(response.__text);
      }
    } catch (error) {
      throw Object.assign(new Error(`[api-def] Invalid '${context.responseType}' response, got: '${response.__text}'`), {
        response,
      });
    }

    const { status } = response;
    return {
      success : Utils.isAcceptableStatus(status, context.acceptableStatus),
      data    : data,
      status  : status,
      headers : response.headers as any,
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
        throw new Error("[api-def] Request was aborted");
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
