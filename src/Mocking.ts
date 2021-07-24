import {ApiResponse, Body, ModulePossiblyDefault, Params, Query, RequestConfig} from "./ApiTypes";
import Endpoint                                                                  from "./Endpoint";
import { isAcceptableStatus } from "./Utils";

export interface MockingConfig {
  loader?: () => Promise<ModulePossiblyDefault<any>>;
  predicate: () => boolean;
}

export interface EndpointMockingInfo<R = any,
  P extends Params | undefined = Params | undefined,
  Q extends Query | undefined = Query | undefined,
  B extends Body | undefined = Body | undefined> {
  func?: MockingFunction<R, P, Q, B>;
  bypass?: boolean;
}

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

export type MockingFunction<R = any,
  P extends Params | undefined = Params | undefined,
  Q extends Query | undefined = Query | undefined,
  B extends Body | undefined = Body | undefined> = (req: MockRequest<R, P, Q, B>, res: MockResponse<R, P, Q, B>) => void;

export const mockRequest = async <R = any,
  P extends Params | undefined = Params | undefined,
  Q extends Query | undefined = Query | undefined,
  B extends Body | undefined = Body | undefined>(
  endpoint: Endpoint<R, P, Q, B>,
  config: RequestConfig<P, Q, B>,
): Promise<ApiResponse<R>> => {
  const mockingFunc = endpoint.mocking?.func;
  if (!mockingFunc) {
    throw new Error(`Endpoint for '${endpoint.path}' has no mocking`);
  }
  const req: MockRequest<R, P, Q, B> = {
    body  : config.body ?? ({} as any),
    params: config.params ?? ({} as any),
    query : config.query ?? ({} as any),
  };

  const res: MockResponse<R, P, Q, B> = {
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
    throw new Error("Mocked API did not respond");
  }

  return {
    success: isAcceptableStatus(res.statusCode),
    headers: {},
    data   : res.response,
    status : res.statusCode,
  };
};
