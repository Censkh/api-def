import * as zod from "zod";
import { Api } from "./Api";
import { Body, Params, Query } from "./ApiTypes";
import Endpoint, { EndpointConfig } from "./Endpoint";
import { Validation } from "./Validation";

/*type ExtractParams<Path> = Path extends `${infer Segment}/${infer Rest}`
  ? Segment extends `:${infer Param}` ? Param | ExtractParams<Rest> : ExtractParams<Rest>
  : Path extends `:${infer Param}` ? Param : undefined;
 */

export default class EndpointBuilder<
  R = any,
  P extends Params | undefined = undefined,
  Q extends Query | undefined = undefined,
  B extends Body | undefined = undefined,
> {
  private api: Api;
  private readonly validation: Validation<R, P, Q, B> = {};

  constructor(api: Api) {
    this.api = api;
  }

  queryOf<Q extends Query>(schema?: zod.Schema<Q>): EndpointBuilder<R, P, Q, B> {
    this.validation.query = schema as any;
    return this as any;
  }

  paramsOf<P extends Params>(): EndpointBuilder<R, P, Q, B> {
    return this as any;
  }

  bodyOf<B extends Body>(schema?: zod.Schema<B>): EndpointBuilder<R, P, Q, B> {
    this.validation.body = schema as any;
    return this as any;
  }

  responseOf<R>(schema?: zod.Schema<R>): EndpointBuilder<R, P, Q, B> {
    this.validation.response = schema as any;
    return this as any;
  }

  build<Path extends string>(config: Omit<EndpointConfig<R, P, Q, B, Path>, "validation">): Endpoint<R, P, Q, B> {
    const endpoint = new Endpoint(this.api, { ...config, validation: this.validation });
    (this.api as any).endpoints[endpoint.id] = endpoint as Endpoint;
    return endpoint as any;
  }
}
