import type { ApiResponse } from "../ApiTypes";
import { inferResponseType } from "../ApiUtils";
import { createHeaders } from "../Headers";
import type { MockContext, MockRequestError, MockResponse } from "../MockingTypes";
import type RequestContext from "../RequestContext";
import { convertToRequestError, RequestErrorCode } from "../RequestError";
import * as Utils from "../Utils";
import { delayThenReturn, randInt } from "../Utils";
import type RequestBackend from "./RequestBackend";
import type { RequestBackendErrorInfo, RequestOperation } from "./RequestBackend";
import { convertStandardResponse, isStandardResponse } from "./StandardResponse";

const defineMockContextProperty = <TValue>(
  mockContext: Record<string, unknown>,
  property: string,
  value: TValue,
): void => {
  Object.defineProperty(mockContext, property, {
    enumerable: true,
    get() {
      return value;
    },
  });
};

const isBlob = (value: unknown): value is Blob => {
  return typeof Blob !== "undefined" && value instanceof Blob;
};

const isArrayBuffer = (value: unknown): value is ArrayBuffer => {
  return typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer;
};

const isArrayBufferView = (value: unknown): value is ArrayBufferView => {
  return typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(value);
};

export default class MockRequestBackend implements RequestBackend<ApiResponse> {
  readonly id = "mock";

  async convertResponse<T>(_context: RequestContext, response: ApiResponse, _error?: boolean): Promise<ApiResponse<T>> {
    return response;
  }

  async extractResponseFromError(error: Error): Promise<ApiResponse | null | undefined> {
    if ("response" in error) {
      const fetchError = error as MockRequestError;
      return fetchError.response ? fetchError.response : null;
    }
    return undefined;
  }

  private createStandardRequest(context: RequestContext): Request {
    if (typeof Request === "undefined") {
      throw convertToRequestError({
        error: new Error("[api-def] Mock handler context.request requires a standard Request implementation"),
        code: RequestErrorCode.REQUEST_INVALID_CONFIG,
        context,
      });
    }

    const headers = createHeaders();
    for (const key of Object.keys(context.requestConfig.headers ?? {})) {
      const value = context.requestConfig.headers?.[key];
      if (value !== undefined && value !== null) {
        headers.set(key, value.toString());
      }
    }

    const parsedBody = context.getParsedBody();
    const method = context.method.toUpperCase();
    let body: BodyInit | undefined;

    if (parsedBody !== undefined && method !== "GET" && method !== "HEAD") {
      if (
        typeof parsedBody === "string" ||
        parsedBody instanceof URLSearchParams ||
        Utils.isFormDataLike(parsedBody) ||
        isBlob(parsedBody) ||
        isArrayBuffer(parsedBody) ||
        isArrayBufferView(parsedBody)
      ) {
        body = parsedBody as BodyInit;
      } else if (parsedBody !== null && typeof parsedBody === "object") {
        body = JSON.stringify(parsedBody);
        if (!headers.has("content-type")) {
          headers.set("content-type", "application/json;charset=utf-8");
        }
      } else {
        body = String(parsedBody);
      }
    }

    return new Request(context.requestUrl.href, {
      method,
      headers,
      body,
      cache: context.requestConfig.browserCache,
      credentials: context.requestConfig.credentials,
    });
  }

  private createMockContext(context: RequestContext): MockContext {
    const mockContext: Record<string, unknown> = {};
    let request: Request | undefined;

    Object.defineProperty(mockContext, "request", {
      enumerable: true,
      get: () => {
        request ??= this.createStandardRequest(context);
        return request;
      },
    });

    defineMockContextProperty(mockContext, "body", context.getParsedBody());
    defineMockContextProperty(mockContext, "params", context.requestConfig.params ?? {});
    defineMockContextProperty(mockContext, "query", context.requestConfig.queryObject);
    defineMockContextProperty(mockContext, "headers", context.requestConfig.headers ?? {});
    defineMockContextProperty(mockContext, "url", context.requestUrl.toString());
    defineMockContextProperty(mockContext, "state", context.requestConfig.state);

    return mockContext as unknown as MockContext;
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

    const mockContext = this.createMockContext(context);

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

    let returnedResponse: Response | undefined;

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
      const result = await delayThenReturn(await mockingFunc(mockContext, res), delayMs);
      returnedResponse = isStandardResponse(result) ? result : undefined;
    } else {
      const result = await mockingFunc(mockContext, res);
      returnedResponse = isStandardResponse(result) ? result : undefined;
    }

    if (returnedResponse) {
      return convertStandardResponse(context, returnedResponse);
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
    }, createHeaders());

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

  getErrorInfo(_error: Error, _response: ApiResponse | undefined | null): RequestBackendErrorInfo | undefined {
    return undefined;
  }
}
