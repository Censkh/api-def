import type { ApiResponse } from "../ApiTypes";
import { inferResponseType } from "../ApiUtils";
import type { MockRequest, MockRequestError, MockResponse } from "../MockingTypes";
import type RequestContext from "../RequestContext";
import { RequestErrorCode, convertToRequestError } from "../RequestError";
import * as Utils from "../Utils";
import { delayThenReturn, randInt } from "../Utils";
import type { RequestBackendErrorInfo, RequestOperation } from "./RequestBackend";
import type RequestBackend from "./RequestBackend";

export default class MockRequestBackend implements RequestBackend<ApiResponse> {
  readonly id = "mock";

  async convertResponse<T>(context: RequestContext, response: ApiResponse, error?: boolean): Promise<ApiResponse<T>> {
    return response;
  }

  async extractResponseFromError(error: Error): Promise<ApiResponse | null | undefined> {
    if ("response" in error) {
      const fetchError = error as MockRequestError;
      return fetchError.response ? fetchError.response : null;
    }
    return undefined;
  }

  private async runRequest(context: RequestContext): Promise<ApiResponse> {
    const mockingFunc = context.mocking?.handler;

    if (!mockingFunc) {
      throw convertToRequestError({
        error: new Error("[api-def] Attempted to run mocked request without mocking function"),
        code: RequestErrorCode.REQUEST_INVALID_CONFIG,
        context,
      });
    }

    const req: MockRequest = {
      body: context.getParsedBody(),
      params: context.requestConfig.params ?? {},
      query: context.requestConfig.queryObject,
      headers: context.requestConfig.headers ?? {},
      url: context.requestUrl.toString(),
      state: context.requestConfig.state,
    };

    const res: MockResponse = {
      statusCode: -1,
      headers: {},
      response: undefined,
      status(statusCode) {
        res.statusCode = statusCode;
        return res;
      },
      send(response) {
        res.response = response;
        if (response && typeof response === "object") {
          res.headers["Content-Type"] = "application/json";
        }
        return res;
      },
    };

    if (context.mocking?.delay) {
      const delay = context.mocking.delay;
      let delayMs: number;
      if (typeof delay === "number") {
        delayMs = delay;
      } else {
        const [min, max] = delay;
        if (min > max) {
          throw convertToRequestError({
            error: new Error("[api-def] Min delay cannot be greater than max delay"),
            code: RequestErrorCode.REQUEST_INVALID_CONFIG,
            context,
          });
        }
        delayMs = randInt(min, max);
      }
      await delayThenReturn(await mockingFunc(req, res), delayMs);
    } else {
      await mockingFunc(req, res);
    }

    if (res.response === undefined) {
      throw convertToRequestError({
        error: new Error("[api-def] Mocked API did not respond"),
        code: RequestErrorCode.REQUEST_INVALID_CONFIG,
        context,
      });
    }

    const parsedHeaders = Object.keys(res.headers).reduce((parsedHeaders, key) => {
      parsedHeaders.set(key, res.headers[key]!.toString());
      return parsedHeaders;
    }, new Headers());

    const responseType = context.responseType ?? inferResponseType(res.headers["content-type"]?.toString());
    let data: any;

    if (responseType === "stream") {
      // For streaming responses, we create a mock async iterator
      data = {
        async *[Symbol.asyncIterator]() {
          if (res.response) {
            // If the response is an array, yield each item
            if (Array.isArray(res.response)) {
              for (const item of res.response) {
                yield new TextEncoder().encode(`${JSON.stringify(item)}\n`);
              }
            } else {
              // Otherwise yield the entire response
              yield new TextEncoder().encode(`${JSON.stringify(res.response)}\n`);
            }
          }
        },
      };
    } else {
      data = res.response;
    }

    return {
      url: context.requestUrl.href,
      method: context.method,
      headers: parsedHeaders,
      data: data,
      status: res.statusCode,
      state: context.requestConfig.state,
      stats: context.stats,
    };
  }

  makeRequest(context: RequestContext): RequestOperation<ApiResponse> {
    return {
      canceler: Utils.noop,
      promise: this.runRequest(context),
    };
  }

  getErrorInfo(error: Error, response: ApiResponse | undefined | null): RequestBackendErrorInfo | undefined {
    return undefined;
  }
}
