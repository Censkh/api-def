import RequestBackend, {RequestBackendErrorInfo, RequestOperation} from "./RequestBackend";
import {ApiResponse}                                               from "../ApiTypes";
import RequestContext                                              from "../RequestContext";
import * as Utils                                                  from "../Utils";
import {MockRequest, MockRequestError, MockResponse}               from "../MockingTypes";
import {convertToRequestError, RequestErrorCode}                   from "../RequestError";

export default class MockRequestBackend implements RequestBackend<ApiResponse> {

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
        code : RequestErrorCode.INVALID_CONFIG,
      });
    }

    const req: MockRequest = {
      body   : context.computedConfig.body,
      params : context.computedConfig.params ?? {},
      query  : context.computedConfig.query,
      headers: context.computedConfig.headers ?? {},
    };

    const res: MockResponse = {
      statusCode: -1,

      response: undefined,

      status(statusCode) {
        res.statusCode = statusCode;
        return res;
      },

      send(response) {
        res.response = response;
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
            code : RequestErrorCode.INVALID_CONFIG,
          });
        }
        delayMs = Utils.randInt(min, max);
      }
      await Utils.delayThenReturn(await mockingFunc(req, res), delayMs);
    } else {
      await mockingFunc(req, res);
    }

    if (res.response === undefined) {
      throw convertToRequestError({
        error: new Error("[api-def] Mocked API did not respond"),
        code : RequestErrorCode.INVALID_CONFIG,
      });
    }

    return({
      success: Utils.isAcceptableStatus(res.statusCode),
      headers: {},
      data   : res.response,
      status : res.statusCode,
    });
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
