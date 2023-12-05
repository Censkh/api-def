import RequestBackend, { ConvertedApiResponse, RequestBackendErrorInfo, RequestOperation } from "./RequestBackend";
import { ApiResponse } from "../ApiTypes";
import RequestContext from "../RequestContext";
import * as Utils from "../Utils";
import { Fetch, getGlobal, getGlobalFetch } from "../Utils";
import { inferResponseType } from "../ApiUtils";

class FetchError extends Error {
  response?: Response;
}

export default class FetchRequestBackend implements RequestBackend<Response> {
  fetch = getGlobalFetch();

  readonly id = "fetch";

  constructor(fetchLibrary?: Fetch) {
    if (fetchLibrary !== undefined) {
      this.fetch = fetchLibrary;

      // otherwise window throws illegal invocation
      if (fetchLibrary === getGlobalFetch()) {
        this.fetch = fetchLibrary.bind(getGlobal());
      }
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

  async convertResponse<T>(context: RequestContext, response: Response & {
    __text?: string
  }): Promise<ConvertedApiResponse<T>> {
    const contentType = response.headers.get("Content-Type");
    const responseType = inferResponseType(contentType);

    if (!response.__text) {
      response.__text = await response.clone().text();
    }
    let data: any = response.__text;

    const {status, headers} = response;

    try {
      if (responseType === "arraybuffer") {
        data = await response.clone().arrayBuffer();
      } else if (responseType === "json") {
        data = JSON.parse(response.__text);
      }
    } catch (error) {
      throw Object.assign(new Error(`[api-def] Invalid '${context.responseType}' response, got: '${response.__text}'`), {
        response,
      });
    }

    const processedHeaders: Record<string, string> = {};
    headers.forEach((value, key) => {
      processedHeaders[key] = value;
    });

    return {
      __lowercaseHeaders: processedHeaders,
      method: context.method,
      url: response.url,
      data: data,
      status: status,
      headers: processedHeaders,
    };
  }

  makeRequest(context: RequestContext): RequestOperation<Response> {
    if (!this.fetch) {
      throw new Error("[api-def] No fetch impl was provided to FetchRequestBackend");
    }

    const {computedConfig} = context;
    // abort controller is a newer feature than fetch
    const abortController = AbortController && new AbortController();
    const abortSignal = abortController ? abortController.signal : undefined;
    let softAbort = false;
    let responded = false;

    const body = context.getParsedBody();

    const bodyJsonify = body !== null && typeof body === "object";

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

    const url = context.requestUrl;

    const promise: Promise<Response> = this.fetch(url.href, {
      method: context.method.toUpperCase(),
      body: bodyJsonify ? JSON.stringify(body) : body as any,
      headers: parsedHeaders,
      mode: "cors",
      signal: abortSignal,
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
      promise: promise,
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
