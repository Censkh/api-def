import RequestBackend, {RequestBackendErrorInfo, RequestOperation} from "./RequestBackend";
import {ApiResponse}                                               from "../ApiTypes";
import RequestContext                                              from "../RequestContext";
import * as Utils                                                  from "../Utils";
import {delayThenReturn, randInt}                                  from "../Utils";
import {MockRequest, MockRequestError, MockResponse}               from "../MockingTypes";
import {convertToRequestError, RequestErrorCode}                   from "../RequestError";

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
        code : RequestErrorCode.REQUEST_INVALID_CONFIG,
        context,
      });
    }

    const req: MockRequest = {
      body   : context.getParsedBody(),
      params : context.computedConfig.params ?? {},
      query  : context.computedConfig.query,
      headers: context.computedConfig.headers ?? {},
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
      let delayMs;
      if (typeof delay === "number") {
        delayMs = delay;
      } else {
        const [min, max] = delay;
        if (min > max) {
          throw convertToRequestError({
            error: new Error("[api-def] Min delay cannot be greater than max delay"),
            code : RequestErrorCode.REQUEST_INVALID_CONFIG,
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
        code : RequestErrorCode.REQUEST_INVALID_CONFIG,
        context,
      });
    }

    const parsedHeaders = Object.keys(res.headers).reduce((parsedHeaders, key) => {
      parsedHeaders[key] = res.headers[key]!.toString();
      return parsedHeaders;
    }, {} as Record<string, string>);

    return {
      headers: parsedHeaders,
      data   : res.response,
      status : res.statusCode,
    };
  }

  makeRequest(context: RequestContext): RequestOperation<ApiResponse> {
    return {
      canceler: Utils.noop,
      promise : this.runRequest(context),
    };
  }

  getErrorInfo(error: Error, response: ApiResponse | undefined | null): RequestBackendErrorInfo | undefined {
    return undefined;
  }

}
