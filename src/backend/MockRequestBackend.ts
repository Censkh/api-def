import RequestBackend, {RequestOperation}            from "./RequestBackend";
import {ApiResponse}                                 from "../ApiTypes";
import RequestContext                                from "../RequestContext";
import * as Utils                                    from "../Utils";
import {MockRequest, MockRequestError, MockResponse} from "../MockingTypes";

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
    const mockingFunc = context.mocking?.func;

    if (!mockingFunc) {
      throw new Error("[api-def] Attempted to run mocked request without mocking function");
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

    await mockingFunc(req, res);
    if (res.response === undefined) {
      throw new Error("[api-def] Mocked API did not respond");
    }

    const response: ApiResponse = {
      headers: {},
      data   : res.response,
      status : res.statusCode,
    };

    // TODO: replace with dylan's isAcceptableStatus
    if (res.statusCode >= 400) {
      throw Object.assign(new Error("[api-def] Mocked request failed"), {
        response: response,
      });
    }

    return response;
  }

  makeRequest(context: RequestContext): RequestOperation<ApiResponse> {
    return {
      canceler: Utils.noop,
      promise : this.runRequest(context),
    };
  }

}
