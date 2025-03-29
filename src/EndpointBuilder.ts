import type * as zod from "zod";
import type { Api } from "./Api";
import type { ResponseType } from "./ApiConstants";
import type { Body, Params, Query, RawHeaders, State } from "./ApiTypes";
import Endpoint, { type EndpointOptions } from "./Endpoint";
import type { Validation } from "./Validation";

type DefaultResponseOf<T extends ResponseType | undefined> = T extends "text"
  ? string
  : T extends "arraybuffer"
    ? ArrayBuffer
    : "stream" extends T
      ? AsyncIterable<Uint8Array>
      : never;

/*type ExtractParams<Path> = Path extends `${infer Segment}/${infer Rest}`
  ? Segment extends `:${infer Param}` ? Param | ExtractParams<Rest> : ExtractParams<Rest>
  : Path extends `:${infer Param}` ? Param : undefined;
 */

export default class EndpointBuilder<
  TResponse = unknown,
  TParams extends Params | undefined = undefined,
  TQuery extends Query | undefined = undefined,
  TBody extends Body | undefined = undefined,
  TState extends State = State,
  TRequestHeaders extends RawHeaders | undefined = RawHeaders | undefined,
  TResponseHeaders extends RawHeaders | undefined = RawHeaders | undefined,
> {
  private api: Api;
  private readonly validation: Validation<TResponse, TParams, TQuery, TBody, TState> = {};

  constructor(api: Api) {
    this.api = api;
  }

  queryOf<TNewQuery extends Query>(
    schema?: zod.Schema<TNewQuery>,
  ): EndpointBuilder<TResponse, TParams, TNewQuery, TBody, TState, TRequestHeaders, TResponseHeaders> {
    this.validation.query = schema as any;
    return this as any;
  }

  paramsOf<TNewParams extends Params>(): EndpointBuilder<
    TResponse,
    TNewParams,
    TQuery,
    TBody,
    TState,
    TRequestHeaders,
    TResponseHeaders
  > {
    return this as any;
  }

  bodyOf<TNewBody extends Body>(
    schema?: zod.Schema<TNewBody>,
  ): EndpointBuilder<TResponse, TParams, TQuery, TNewBody, TState, TRequestHeaders, TResponseHeaders> {
    this.validation.body = schema as any;
    return this as any;
  }

  responseOf<TNewResponse>(
    schema?: zod.Schema<TNewResponse>,
  ): EndpointBuilder<TNewResponse, TParams, TQuery, TBody, TState, TRequestHeaders, TResponseHeaders> {
    this.validation.response = schema as any;
    return this as any;
  }

  stateOf<TNewState extends State>(
    schema?: zod.Schema<TNewState>,
  ): EndpointBuilder<TResponse, TParams, TQuery, TBody, TNewState, TRequestHeaders, TResponseHeaders> {
    this.validation.state = schema as any;
    return this as any;
  }

  requestHeadersOf<TNewRequestHeaders extends RawHeaders>(): EndpointBuilder<
    TResponse,
    TParams,
    TQuery,
    TBody,
    TState,
    TNewRequestHeaders,
    TResponseHeaders
  > {
    return this as any;
  }

  responseHeadersOf<TNewResponseHeaders extends RawHeaders>(): EndpointBuilder<
    TResponse,
    TParams,
    TQuery,
    TBody,
    TState,
    TRequestHeaders,
    TNewResponseHeaders
  > {
    return this as any;
  }

  build<TPath extends string, TResponseType extends ResponseType>(
    options: Omit<
      EndpointOptions<TResponse, TParams, TQuery, TBody, TState, TPath, TRequestHeaders, TResponseHeaders>,
      "validation"
    > & {
      responseType?: TResponseType;
    },
  ): Endpoint<
    TResponse extends unknown ? DefaultResponseOf<TResponseType> : TResponse,
    TParams,
    TQuery,
    TBody,
    TState,
    TPath,
    TRequestHeaders,
    TResponseHeaders
  > {
    const endpoint = new Endpoint(this.api, { ...options, validation: this.validation });
    (this.api as any).endpoints[endpoint.id] = endpoint as Endpoint;
    return endpoint as any;
  }
}
