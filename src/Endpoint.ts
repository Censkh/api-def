import type { Api } from "./Api";
import * as Requester from "./Requester";

import type { RequestMethod, ResponseType } from "./ApiConstants";
import type {
  ApiResponse,
  BaseRequestConfig,
  Body,
  ComputedRequestConfig,
  Params,
  Query,
  RawHeaders,
  RequestConfig,
  RequestHost,
  RequestMiddleware,
  State,
} from "./ApiTypes";
import { resolvePathParams } from "./ApiUtils";
import type * as Mocking from "./MockingTypes";
import { processRequestConfigs } from "./RequestConfig";
import type { Validation } from "./Validation";
import type RequestBackend from "./backend/RequestBackend";

export interface EndpointResolveUrlOptions<TParams extends Params | undefined, TQuery extends Query | undefined> {
  params?: (TParams extends string | symbol | number ? Record<TParams, string> : never) | undefined;
  query?: TQuery;
}

export interface EndpointResolvePathOptions<TParams extends Params | undefined> {
  params?: (TParams extends string | symbol | number ? Record<TParams, string> : never) | undefined;
}

export interface EndpointOptions<
  TResponse,
  TParams extends Params | undefined,
  TQuery extends Query | undefined,
  TBody extends Body | undefined,
  TState extends State = State,
  TPath extends string = string,
  TRequestHeaders extends RawHeaders | undefined = RawHeaders | undefined,
  TResponseHeaders extends RawHeaders | undefined = RawHeaders | undefined,
> {
  readonly id: string;
  readonly method: RequestMethod;
  readonly path: TPath;

  /**
   * Name your endpoint to help with debugging and documentation
   * @default `id` is used as the name if no name is supplied
   */
  readonly name?: string;
  /**
   * Describe your endpoint to help with debugging and documentation
   */
  readonly description?: string;

  /** @deprecated use `defaultRequestConfig` instead */
  readonly config?: BaseRequestConfig;

  /**
   * Default request configuration for this endpoint
   */
  readonly defaultRequestConfig?: BaseRequestConfig;

  /**
   * Let the backend requestor (fetch, axios, etc.) know what type of response
   * you are expecting from this endpoint
   * @default `application/json`
   */
  readonly responseType?: ResponseType;

  /**
   * Specify mocking for your endpoint upfront to help with disconnected dev,
   * and testing.
   * Enable/disable mocked returns for all endpoints on your API object.
   */
  readonly mocking?: Mocking.EndpointMockingConfig<TResponse, TParams, TQuery, TBody, TState>;

  /**
   * Middleware specific to this endpoint. These will be executed after API-level middleware.
   */
  readonly middleware?: RequestMiddleware[];

  readonly validation?: Validation<TResponse, TParams, TQuery, TBody, TState>;
}

export type EndpointInfo<
  TResponse,
  TParams extends Params | undefined,
  TQuery extends Query | undefined,
  TBody extends Body | undefined,
  TState extends State = State,
  TPath extends string = string,
  TRequestHeaders extends RawHeaders | undefined = RawHeaders | undefined,
  TResponseHeaders extends RawHeaders | undefined = RawHeaders | undefined,
> = EndpointOptions<TResponse, TParams, TQuery, TBody, TState, TPath, TRequestHeaders, TResponseHeaders> &
  Omit<
    Required<
      Pick<
        EndpointOptions<TResponse, TParams, TQuery, TBody, TState, TPath, TRequestHeaders, TResponseHeaders>,
        "name" | "validation" | "defaultRequestConfig"
      >
    >,
    "config"
  >;

/**
 * @deprecated Use `EndpointInfo` instead
 */
export type EndpointConfig<
  TResponse,
  TParams extends Params | undefined,
  TQuery extends Query | undefined,
  TBody extends Body | undefined,
  TState extends State = State,
  TPath extends string = string,
  TRequestHeaders extends RawHeaders | undefined = RawHeaders | undefined,
  TResponseHeaders extends RawHeaders | undefined = RawHeaders | undefined,
> = EndpointInfo<TResponse, TParams, TQuery, TBody, TState, TPath, TRequestHeaders, TResponseHeaders>;

export default class Endpoint<
  TResponse = any,
  TParams extends Params | undefined = Params | undefined,
  TQuery extends Query | undefined = Query | undefined,
  TBody extends Body | undefined = Body | undefined,
  TState extends State = State,
  TPath extends string = string,
  TRequestHeaders extends RawHeaders | undefined = RawHeaders | undefined,
  TResponseHeaders extends RawHeaders | undefined = RawHeaders | undefined,
> implements
    EndpointInfo<TResponse, TParams, TQuery, TBody, TState, TPath, TRequestHeaders, TResponseHeaders>,
    RequestHost
{
  public readonly api: Api;

  private readonly info: EndpointInfo<
    TResponse,
    TParams,
    TQuery,
    TBody,
    TState,
    TPath,
    TRequestHeaders,
    TResponseHeaders
  >;

  constructor(
    api: Api,
    options: EndpointOptions<TResponse, TParams, TQuery, TBody, TState, TPath, TRequestHeaders, TResponseHeaders>,
  ) {
    this.api = api;

    this.info = {
      ...options,
      config: undefined,
      name: options.name || options.id,
      validation: options.validation || {},
      middleware: options.middleware || [],
      defaultRequestConfig: options.defaultRequestConfig ?? options.config ?? {},
    };
  }

  get id(): string {
    return this.info.id;
  }

  get method(): RequestMethod {
    return this.info.method;
  }

  get path(): TPath {
    return this.info.path;
  }

  get name(): string {
    return this.info.name;
  }

  get description(): string | undefined {
    return this.info.description;
  }

  /** @deprecated Use `defaultRequestConfig` instead */
  get config(): BaseRequestConfig {
    return this.defaultRequestConfig;
  }

  get defaultRequestConfig(): BaseRequestConfig {
    return this.info.defaultRequestConfig;
  }

  get responseType(): ResponseType | undefined {
    return this.info.responseType;
  }

  get mocking(): Mocking.EndpointMockingConfig<TResponse, TParams, TQuery, TBody, TState> | undefined {
    return this.info.mocking;
  }

  get validation(): Validation<TResponse, TParams, TQuery, TBody, TState> {
    return this.info.validation;
  }

  get middleware(): RequestMiddleware[] {
    return this.info.middleware || [];
  }

  public async submit(
    config: RequestConfig<TParams, TQuery, TBody, TState, TRequestHeaders>,
  ): Promise<ApiResponse<TResponse>> {
    let mock = false;

    const apiMocking = this.api.mocking;
    if (apiMocking) {
      const mockingEnabled =
        (typeof apiMocking.enabled === "function" ? apiMocking.enabled() : apiMocking.enabled) ?? false;
      if (mockingEnabled) {
        if (!this.mocking?.handler) {
          throw new Error(`[api-def] Endpoint for '${this.path}' has no mocking`);
        }

        mock = true;
      }
    }

    return Requester.submit(this, config, mock ? this.mocking : null);
  }

  resolveUrl(options: EndpointResolveUrlOptions<TParams, TQuery>): URL {
    const { query } = options;
    const url = this.api.resolveUrl(this.resolvePath(options));
    if (query) {
      url.search = new URLSearchParams(query as any).toString();
    }
    return url;
  }

  resolvePath(options: EndpointResolvePathOptions<TParams>): string {
    const { params } = options;
    return resolvePathParams(this.path, params);
  }

  get baseUrl(): string {
    return this.api.baseUrl;
  }

  /**
   * @deprecated Use `defaultRequestConfig` instead
   */
  computeConfig<
    TParams extends Params | undefined,
    TQuery extends Query | undefined,
    TBody extends Body | undefined,
    TState extends State,
    TRequestHeaders extends RawHeaders | undefined,
  >(
    config: RequestConfig<TParams, TQuery, TBody, TState, TRequestHeaders>,
  ): ComputedRequestConfig<TParams, TQuery, TBody, TState, TRequestHeaders> {
    return this.computeRequestConfig(config);
  }

  computeRequestConfig<
    TParams extends Params | undefined,
    TQuery extends Query | undefined,
    TBody extends Body | undefined,
    TState extends State,
    TRequestHeaders extends RawHeaders | undefined,
  >(
    config: RequestConfig<TParams, TQuery, TBody, TState, TRequestHeaders>,
  ): ComputedRequestConfig<TParams, TQuery, TBody, TState, TRequestHeaders> {
    const apiDefaults = this.api.computeRequestConfig();
    const endpointDefaults = this.defaultRequestConfig || {};

    return processRequestConfigs([apiDefaults, endpointDefaults, config]);
  }

  getRequestBackend(): RequestBackend {
    return this.api.requestBackend;
  }
}
