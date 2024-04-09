import { ApiResponse, Body, Headers, Params, Query } from "./ApiTypes";

export interface ApiMockingConfig {
  enabled: boolean | (() => boolean);
}

export interface MockRequest<
  R = any,
  P extends Params | undefined = Params | undefined,
  Q extends Query | undefined = Query | undefined,
  B extends Body | undefined = Body | undefined,
> {
  params: P extends Params ? Record<P, string> : {};
  body: B;
  query: Q;
  headers: Readonly<Headers>;
  url: string;
}

export interface MockResponse<
  R = any,
  P extends Params | undefined = Params | undefined,
  Q extends Query | undefined = Query | undefined,
  B extends Body | undefined = Body | undefined,
> {
  statusCode: number;

  response: R | undefined;

  headers: Headers;

  status(statusCode: number): this;

  send(response: R): this;
}

export type MockRequestError = Error & { response?: ApiResponse };

export type EndpointMockingFunction<
  R = any,
  P extends Params | undefined = Params | undefined,
  Q extends Query | undefined = Query | undefined,
  B extends Body | undefined = Body | undefined,
> = (
  req: MockRequest<R, P, Q, B>,
  res: MockResponse<R, P, Q, B>,
) => Promise<MockResponse<R, P, Q, B>> | MockResponse<R, P, Q, B>;

export interface EndpointMockingConfig<
  R = any,
  P extends Params | undefined = Params | undefined,
  Q extends Query | undefined = Query | undefined,
  B extends Body | undefined = Body | undefined,
> {
  /**-
   * The range supplied will be used to simulate the lag in obtaining a response
   * your endpoint. If no values are supplied, a response will be returned immediately
   */
  delay?: number | [minMs: number, maxMs: number];
  handler: EndpointMockingFunction<R, P, Q, B>;

  // TODO expand for random erroneous returns...or perhaps an error mode
}
