import type { ApiResponse, Body, Params, Query, RawHeaders, State } from "./ApiTypes";

export interface ApiMockingConfig {
  enabled: boolean | (() => boolean);
}

export interface MockRequest<
  TResponse = any,
  TParams extends Params | undefined = Params | undefined,
  TQuery extends Query | undefined = Query | undefined,
  TBody extends Body | undefined = Body | undefined,
  TState extends State = State,
> {
  params: TParams extends Params ? Record<TParams, string> : {};
  body: TBody;
  query: TQuery;
  headers: Readonly<RawHeaders>;
  url: string;
  state: TState;
}

export interface MockResponse<
  TResponse = any,
  TParams extends Params | undefined = Params | undefined,
  TQuery extends Query | undefined = Query | undefined,
  TBody extends Body | undefined = Body | undefined,
  TState extends State = State,
> {
  statusCode: number;

  response: TResponse | undefined;

  headers: RawHeaders;

  status(statusCode: number): this;

  send(response: TResponse): this;
}

export type MockRequestError = Error & { response?: ApiResponse };

export type EndpointMockingFunction<
  TResponse = any,
  TParams extends Params | undefined = Params | undefined,
  TQuery extends Query | undefined = Query | undefined,
  TBody extends Body | undefined = Body | undefined,
  TState extends State = State,
> = (
  req: MockRequest<TResponse, TParams, TQuery, TBody, TState>,
  res: MockResponse<TResponse, TParams, TQuery, TBody, TState>,
) => Promise<MockResponse<TResponse, TParams, TQuery, TBody>> | MockResponse<TResponse, TParams, TQuery, TBody, TState>;

export interface EndpointMockingConfig<
  TResponse = any,
  TParams extends Params | undefined = Params | undefined,
  TQuery extends Query | undefined = Query | undefined,
  TBody extends Body | undefined = Body | undefined,
  TState extends State = State,
> {
  /**-
   * The range supplied will be used to simulate the lag in obtaining a response
   * your endpoint. If no values are supplied, a response will be returned immediately
   */
  delay?: number | [minMs: number, maxMs: number];
  handler: EndpointMockingFunction<TResponse, TParams, TQuery, TBody, TState>;

  // TODO expand for random erroneous returns...or perhaps an error mode
}
