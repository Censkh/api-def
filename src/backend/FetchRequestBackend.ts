import type { ApiResponse } from "../ApiTypes";
import { inferResponseType } from "../ApiUtils";
import type RequestContext from "../RequestContext";
import { RequestErrorCode, convertToRequestError } from "../RequestError";
import * as Utils from "../Utils";
import { type Fetch, getGlobal, getGlobalFetch } from "../Utils";
import type { ConvertedApiResponse, RequestBackendErrorInfo, RequestOperation } from "./RequestBackend";
import type RequestBackend from "./RequestBackend";

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

  async extractResponseFromError(error: Error): Promise<Response | null | undefined> {
    if ("response" in error) {
      const fetchError = error as FetchError;
      return fetchError.response ? fetchError.response : null;
    }
    return undefined;
  }

  async convertResponse<T>(
    context: RequestContext,
    response: Response & {
      __text?: string;
    },
  ): Promise<ConvertedApiResponse<T>> {
    const { status, headers } = response;

    const convertedResponse = {
      method: context.method,
      url: response.url,
      data: undefined as any,
      status: status,
      headers: headers,
      state: context.requestConfig.state,
      stats: context.stats,
    } satisfies ApiResponse<T>;
    const responseType = context.responseType ?? inferResponseType(response.headers.get("Content-Type"));

    let text: string | undefined;
    let data: any;

    try {
      if (responseType === "arraybuffer") {
        data = await response.arrayBuffer();
      } else if (responseType === "json") {
        text = await response.text();
        data = JSON.parse(text);
      } else if (responseType === "stream") {
        data = response.body;
      } else {
        data = await response.text();
      }
    } catch (error) {
      throw convertToRequestError({
        error: Object.assign(
          new Error(`[api-def] Failed to parse response as '${responseType}'${text ? `, got: ${text}` : ""}`),
          {
            cause: error,
          },
        ),
        code: RequestErrorCode.REQUEST_MISMATCH_RESPONSE_TYPE,
        context: context,
        response: convertedResponse,
      });
    }

    convertedResponse.data = data;

    return convertedResponse;
  }

  makeRequest(context: RequestContext): RequestOperation<Response> {
    if (!this.fetch) {
      throw new Error("[api-def] No fetch impl was provided to FetchRequestBackend");
    }

    const { requestConfig } = context;
    // abort controller is a newer feature than fetch
    const abortController = AbortController && new AbortController();
    const abortSignal = abortController ? abortController.signal : undefined;
    let softAbort = false;
    let responded = false;

    const body = context.getParsedBody();

    const bodyJsonify = body !== null && typeof body === "object" && !Utils.isFormData(body);

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
      fetchOptions.credentials = requestConfig.credentials ? "include" : undefined;
    }

    if (requestConfig.debug) {
      console.log(`[api-def] Fetching '${url.href}' with options`, JSON.stringify(fetchOptions, null, 2));
    }

    const promise: Promise<Response> = this.fetch(url.href, fetchOptions).then((response) => {
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
