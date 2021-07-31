import { ApiResponse,
         Body,
         Params,
         Query,
         RequestConfig }        from "./ApiTypes";
import { delayThenReturn,
         isAcceptableStatus,
         randInt }              from "./Utils";

export interface MockRequest<R = any,
                             P extends Params | undefined = Params | undefined,
                             Q extends Query | undefined = Query | undefined,
                             B extends Body | undefined = Body | undefined> {
                               params: P extends Params ? Record<P, string> : {};
                               body: B;
                               query: Q;
                             }

export interface MockResponse<R = any,
  P extends Params | undefined = Params | undefined,
  Q extends Query | undefined = Query | undefined,
  B extends Body | undefined = Body | undefined> {
  statusCode: number;

  response: R | undefined;

  status(statusCode: number): this;

  send(response: R): this;
}

export type EndpointMockingFunction<R = any,
                                    P extends Params | undefined = Params | undefined,
                                    Q extends Query  | undefined = Query  | undefined,
                                    B extends Body   | undefined = Body   | undefined> = (req: MockRequest<R,P,Q,B>, res: MockResponse<R,P,Q,B>) => Promise<MockResponse<R,P,Q,B>> | MockResponse<R,P,Q,B>;

export interface EndpointMockingConfig<R = any,
                                       P extends Params | undefined = Params | undefined,
                                       Q extends Query  | undefined = Query  | undefined,
                                       B extends Body   | undefined = Body   | undefined> {
  /**-
   * The range supplied will be used to simulate the lag in obtaining a response
   * your endpoint. If no values are supplied, a response will be returned immediately
   */
  delay?   : [minMs: number, maxMs: number],
  handler  : EndpointMockingFunction<R, P, Q, B>,

  // TODO expand for random erroneous returns...or perhaps an error mode
}

export const mockRequest = async <R = any,
                                  P extends Params | undefined = Params | undefined,
                                  Q extends Query  | undefined = Query  | undefined,
                                  B extends Body   | undefined = Body   | undefined>(
                                    path           : string,
                                    reqConfig      : RequestConfig<P, Q, B>,
                                    mockingConfig? : EndpointMockingConfig<R, P, Q, B>,
                                  ): Promise<ApiResponse<R>> => {

  const mockingFnDefined = !!(mockingConfig?.handler);
  if (!mockingFnDefined) {
    throw new Error(`Endpoint for '${path}' has no mocking`);
  }

  const { handler, delay } = mockingConfig!;

  const req: MockRequest<R, P, Q, B> = {
    body  : reqConfig.body   ?? ({} as any),
    params: reqConfig.params ?? ({} as any),
    query : reqConfig.query  ?? ({} as any),
  };

  const res: MockResponse<R, P, Q, B> = {
    statusCode : -1,
    response   : undefined,

    status(statusCode) {
      res.statusCode = statusCode;
      return res;
    },

    send(response) {
      res.response = response;
      return res;
    },
  };

  const [min, max] = delay ?? [0, 0];
  if (max > min) {
    const delayMs = randInt(min, max);
    await delayThenReturn(await handler(req, res), delayMs);
  } else {
    await handler(req, res);
  }

  // res.response, res.status should have been set by the `handler` via `status(...)` and `send(...)`

  if (res.response === undefined) {
    throw new Error("Mocked API did not respond");
  }

  return {
    success: isAcceptableStatus(res.statusCode),
    headers: {},
    data   : res.response,
    status : res.statusCode,
  };
};
