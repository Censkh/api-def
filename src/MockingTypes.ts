import {ApiResponse, Body, Headers, ModulePossiblyDefault, Params, Query, RequestConfig} from "./ApiTypes";
import Endpoint                                                                          from "./Endpoint";

export interface MockingConfig {
  loader?: () => Promise<ModulePossiblyDefault<any>>;
  predicate: () => boolean;
}

export interface MockingInfo<R = any,
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
  headers: Readonly<Headers>;
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

export type MockRequestError = Error & {response?: ApiResponse};

export type MockingFunction<R = any,
  P extends Params | undefined = Params | undefined,
  Q extends Query | undefined = Query | undefined,
  B extends Body | undefined = Body | undefined> = (req: MockRequest<R, P, Q, B>, res: MockResponse<R, P, Q, B>) => void;
