import type * as zod from "zod";
import type { Api } from "./Api";
import type { Body, Params, Query, State } from "./ApiTypes";
import Endpoint, { type EndpointConfig } from "./Endpoint";
import type { Validation } from "./Validation";

/*type ExtractParams<Path> = Path extends `${infer Segment}/${infer Rest}`
  ? Segment extends `:${infer Param}` ? Param | ExtractParams<Rest> : ExtractParams<Rest>
  : Path extends `:${infer Param}` ? Param : undefined;
 */

export default class EndpointBuilder<
  TResponse = any,
  TParams extends Params | undefined = undefined,
  TQuery extends Query | undefined = undefined,
  TBody extends Body | undefined = undefined,
  TState extends State = State,
> {
  private api: Api;
  private readonly validation: Validation<TResponse, TParams, TQuery, TBody, TState> = {};

  constructor(api: Api) {
    this.api = api;
  }

  queryOf<TNewQuery extends Query>(
    schema?: zod.Schema<TNewQuery>,
  ): EndpointBuilder<TResponse, TParams, TNewQuery, TBody> {
    this.validation.query = schema as any;
    return this as any;
  }

  paramsOf<TNewParams extends Params>(): EndpointBuilder<TResponse, TNewParams, TQuery, TBody, TState> {
    return this as any;
  }

  bodyOf<TNewBody extends Body>(
    schema?: zod.Schema<TNewBody>,
  ): EndpointBuilder<TResponse, TParams, TQuery, TNewBody, TState> {
    this.validation.body = schema as any;
    return this as any;
  }

  responseOf<TNewResponse>(
    schema?: zod.Schema<TNewResponse>,
  ): EndpointBuilder<TNewResponse, TParams, TQuery, TBody, TState> {
    this.validation.response = schema as any;
    return this as any;
  }

  stateOf<TNewState extends State>(
    schema?: zod.Schema<TNewState>,
  ): EndpointBuilder<TResponse, TParams, TQuery, TBody, TNewState> {
    this.validation.state = schema as any;
    return this as any;
  }

  build<TPath extends string>(
    config: Omit<EndpointConfig<TResponse, TParams, TQuery, TBody, TState, TPath>, "validation">,
  ): Endpoint<TResponse, TParams, TQuery, TBody, TState> {
    const endpoint = new Endpoint(this.api, { ...config, validation: this.validation });
    (this.api as any).endpoints[endpoint.id] = endpoint as Endpoint;
    return endpoint as any;
  }
}
