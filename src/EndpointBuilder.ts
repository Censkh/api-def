import type * as zod from "zod";
import type { Api } from "./Api";
import type { ResponseType } from "./ApiConstants";
import type { Body, Params, Query, RawHeaders, State } from "./ApiTypes";
import Endpoint, { type EndpointOptions } from "./Endpoint";
import type { BodyValidationOptions, Validation, ValidationOptions } from "./Validation";

type DefaultResponseOf<T extends ResponseType | undefined> = T extends "text"
  ? string
  : T extends "arraybuffer"
    ? ArrayBuffer
    : T extends "stream"
      ? AsyncIterable<Uint8Array>
      : T extends "websocket"
        ? WebSocket
        : unknown;

const isSchema = <TValue>(
  value: BodyValidationOptions<any> | ValidationOptions<TValue> | zod.Schema<TValue>,
): value is zod.Schema<TValue> => {
  return value !== undefined && "parse" in value;
};

const warnDeprecatedSchemaArgument = (methodName: string): void => {
  console.warn(`[api-def] ${methodName}(schema) is deprecated. Use ${methodName}({ schema }) instead.`);
};

/*type ExtractParams<Path> = Path extends `${infer Segment}/${infer Rest}`
  ? Segment extends `:${infer Param}` ? Param | ExtractParams<Rest> : ExtractParams<Rest>
  : Path extends `:${infer Param}` ? Param : undefined;
 */

export type EndpointBuildOptions<
  TResponse = unknown,
  TParams extends Params | undefined = undefined,
  TQuery extends Query | undefined = undefined,
  TBody extends Body | undefined = undefined,
  TState extends State = State,
  TRequestHeaders extends RawHeaders | undefined = RawHeaders | undefined,
  TResponseHeaders extends RawHeaders | undefined = RawHeaders | undefined,
  TPath extends string = string,
  TResponseType extends ResponseType | undefined = undefined,
> = Omit<
  EndpointOptions<TResponse, TParams, TQuery, TBody, TState, TPath, TRequestHeaders, TResponseHeaders>,
  "validation"
> & {
  responseType?: TResponseType;
};

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
    options?: ValidationOptions<TNewQuery>,
  ): EndpointBuilder<TResponse, TParams, TNewQuery, TBody, TState, TRequestHeaders, TResponseHeaders>;
  /**
   * @deprecated Pass `{ schema }` instead.
   */
  queryOf<TNewQuery extends Query>(
    schema?: zod.Schema<TNewQuery>,
  ): EndpointBuilder<TResponse, TParams, TNewQuery, TBody, TState, TRequestHeaders, TResponseHeaders>;
  queryOf<TNewQuery extends Query>(
    optionsOrSchema?: ValidationOptions<TNewQuery> | zod.Schema<TNewQuery>,
  ): EndpointBuilder<TResponse, TParams, TNewQuery, TBody, TState, TRequestHeaders, TResponseHeaders> {
    if (optionsOrSchema && isSchema(optionsOrSchema)) {
      warnDeprecatedSchemaArgument("queryOf");
      this.validation.query = optionsOrSchema as any;
      return this as any;
    }

    this.validation.query = optionsOrSchema?.schema as any;
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
    options?: BodyValidationOptions<TNewBody>,
  ): EndpointBuilder<TResponse, TParams, TQuery, TNewBody, TState, TRequestHeaders, TResponseHeaders>;
  /**
   * @deprecated Pass `{ schema }` instead.
   */
  bodyOf<TNewBody extends Body>(
    schema?: zod.Schema<TNewBody>,
  ): EndpointBuilder<TResponse, TParams, TQuery, TNewBody, TState, TRequestHeaders, TResponseHeaders>;
  bodyOf<TNewBody extends Body>(
    optionsOrSchema?: BodyValidationOptions<TNewBody> | zod.Schema<TNewBody>,
  ): EndpointBuilder<TResponse, TParams, TQuery, TNewBody, TState, TRequestHeaders, TResponseHeaders> {
    if (optionsOrSchema && isSchema(optionsOrSchema)) {
      warnDeprecatedSchemaArgument("bodyOf");
      this.validation.body = optionsOrSchema as any;
      this.validation.bodyEncoding = "application/json";
      return this as any;
    }

    this.validation.body = optionsOrSchema?.schema as any;
    this.validation.bodyEncoding = optionsOrSchema?.encoding ?? "application/json";
    return this as any;
  }

  responseOf<TNewResponse>(
    options?: ValidationOptions<TNewResponse>,
  ): EndpointBuilder<TNewResponse, TParams, TQuery, TBody, TState, TRequestHeaders, TResponseHeaders>;
  /**
   * @deprecated Pass `{ schema }` instead.
   */
  responseOf<TNewResponse>(
    schema?: zod.Schema<TNewResponse>,
  ): EndpointBuilder<TNewResponse, TParams, TQuery, TBody, TState, TRequestHeaders, TResponseHeaders>;
  responseOf<TNewResponse>(
    optionsOrSchema?: ValidationOptions<TNewResponse> | zod.Schema<TNewResponse>,
  ): EndpointBuilder<TNewResponse, TParams, TQuery, TBody, TState, TRequestHeaders, TResponseHeaders> {
    if (optionsOrSchema && isSchema(optionsOrSchema)) {
      warnDeprecatedSchemaArgument("responseOf");
      this.validation.response = optionsOrSchema as any;
      return this as any;
    }

    this.validation.response = optionsOrSchema?.schema as any;
    return this as any;
  }

  stateOf<TNewState extends State>(
    options?: ValidationOptions<TNewState>,
  ): EndpointBuilder<TResponse, TParams, TQuery, TBody, TNewState, TRequestHeaders, TResponseHeaders>;
  /**
   * @deprecated Pass `{ schema }` instead.
   */
  stateOf<TNewState extends State>(
    schema?: zod.Schema<TNewState>,
  ): EndpointBuilder<TResponse, TParams, TQuery, TBody, TNewState, TRequestHeaders, TResponseHeaders>;
  stateOf<TNewState extends State>(
    optionsOrSchema?: ValidationOptions<TNewState> | zod.Schema<TNewState>,
  ): EndpointBuilder<TResponse, TParams, TQuery, TBody, TNewState, TRequestHeaders, TResponseHeaders> {
    if (optionsOrSchema && isSchema(optionsOrSchema)) {
      warnDeprecatedSchemaArgument("stateOf");
      this.validation.state = optionsOrSchema as any;
      return this as any;
    }

    this.validation.state = optionsOrSchema?.schema as any;
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
    options: EndpointBuildOptions<
      TResponse,
      TParams,
      TQuery,
      TBody,
      TState,
      TRequestHeaders,
      TResponseHeaders,
      TPath,
      TResponseType
    >,
  ): Endpoint<
    unknown extends TResponse ? DefaultResponseOf<TResponseType> : TResponse,
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
