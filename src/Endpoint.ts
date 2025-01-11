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
  RequestConfig,
  RequestHost,
  State,
} from "./ApiTypes";
import type * as Mocking from "./MockingTypes";
import { processRequestConfigs } from "./RequestConfig";
import type { Validation } from "./Validation";
import type RequestBackend from "./backend/RequestBackend";

export interface EndpointOptions<
  TResult,
  TParams extends Params | undefined,
  TQuery extends Query | undefined,
  TBody extends Body | undefined,
  TState extends State = State,
  TPath extends string = string,
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
  readonly config?: BaseRequestConfig;
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
  readonly mocking?: Mocking.EndpointMockingConfig<TResult, TParams, TQuery, TBody, TState>;

  readonly validation?: Validation<TResult, TParams, TQuery, TBody, TState>;
}

export type EndpointInfo<
  TResult,
  TParams extends Params | undefined,
  TQuery extends Query | undefined,
  TBody extends Body | undefined,
  TState extends State = State,
  TPath extends string = string,
> = EndpointOptions<TResult, TParams, TQuery, TBody, TState, TPath> &
  Required<Pick<EndpointOptions<TResult, TParams, TQuery, TBody, TState, TPath>, "name" | "validation">>;

/**
 * @deprecated Use `EndpointInfo` instead
 */
export type EndpointConfig<
  TResult,
  TParams extends Params | undefined,
  TQuery extends Query | undefined,
  TBody extends Body | undefined,
  TState extends State = State,
  TPath extends string = string,
> = EndpointInfo<TResult, TParams, TQuery, TBody, TState, TPath>;

export default class Endpoint<
  TResponse = any,
  TParams extends Params | undefined = Params | undefined,
  TQuery extends Query | undefined = Query | undefined,
  TBody extends Body | undefined = Body | undefined,
  TState extends State = State,
> implements EndpointInfo<TResponse, TParams, TQuery, TBody, TState>, RequestHost
{
  public readonly api: Api;

  private readonly info: EndpointInfo<TResponse, TParams, TQuery, TBody, TState>;

  constructor(api: Api, options: EndpointOptions<TResponse, TParams, TQuery, TBody, TState>) {
    this.api = api;

    this.info = {
      ...options,
      name: options.name || options.id,
      validation: options.validation || {},
    };
  }

  get id(): string {
    return this.info.id;
  }

  get method(): RequestMethod {
    return this.info.method;
  }

  get path(): string {
    return this.info.path;
  }

  get name(): string {
    return this.info.name;
  }

  get description(): string | undefined {
    return this.info.description;
  }

  get config(): BaseRequestConfig {
    return this.info.config || {};
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

  public async submit(config: RequestConfig<TParams, TQuery, TBody, TState>): Promise<ApiResponse<TResponse>> {
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

  computePath(path: string, request: RequestConfig): string {
    let computedPath = path.startsWith("/") ? path : `/${path}`;
    if (request.params) {
      const keys = Object.keys(request.params);
      for (let i = 0; i < keys.length; i++) {
        const argName = keys[i];
        computedPath = computedPath.replace(`:${argName}`, request.params[argName]);
      }
    }
    if (computedPath.includes(":")) {
      throw new Error(`[api-def] Not all path params have been resolved: '${computedPath}'`);
    }
    return computedPath;
  }

  get baseUrl(): string {
    return this.api.baseUrl;
  }

  /**
   * @deprecated Use `computeRequestConfig` instead
   */
  computeConfig<
    TParams extends Params | undefined,
    TQuery extends Query | undefined,
    TBody extends Body | undefined,
    TState extends State,
  >(config: RequestConfig<TParams, TQuery, TBody, TState>): ComputedRequestConfig<TParams, TQuery, TBody, TState> {
    return this.computeRequestConfig(config);
  }

  computeRequestConfig<
    TParams extends Params | undefined,
    TQuery extends Query | undefined,
    TBody extends Body | undefined,
    TState extends State,
  >(config: RequestConfig<TParams, TQuery, TBody, TState>): ComputedRequestConfig<TParams, TQuery, TBody, TState> {
    const apiDefaults = this.api.computeRequestConfig();

    return processRequestConfigs([apiDefaults, this.config, config]);
  }

  getRequestBackend(): RequestBackend {
    return this.api.requestBackend;
  }
}
