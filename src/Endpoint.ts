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
  TRequestHeaders extends RawHeaders | undefined = RawHeaders | undefined,
  TResponseHeaders extends RawHeaders | undefined = RawHeaders | undefined,
> = EndpointOptions<TResult, TParams, TQuery, TBody, TState, TPath, TRequestHeaders, TResponseHeaders> &
  Required<
    Pick<
      EndpointOptions<TResult, TParams, TQuery, TBody, TState, TPath, TRequestHeaders, TResponseHeaders>,
      "name" | "validation"
    >
  >;

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
  TRequestHeaders extends RawHeaders | undefined = RawHeaders | undefined,
  TResponseHeaders extends RawHeaders | undefined = RawHeaders | undefined,
> = EndpointInfo<TResult, TParams, TQuery, TBody, TState, TPath>;

export type Endpoint<
  TResponse = any,
  TParams extends Params | undefined = Params | undefined,
  TQuery extends Query | undefined = Query | undefined,
  TBody extends Body | undefined = Body | undefined,
  TState extends State = State,
  TPath extends string = string,
  TRequestHeaders extends RawHeaders | undefined = RawHeaders | undefined,
  TResponseHeaders extends RawHeaders | undefined = RawHeaders | undefined,
> = EndpointInfo<TResponse, TParams, TQuery, TBody, TState, TPath, TRequestHeaders, TResponseHeaders> &
  RequestHost & {
    (config: RequestConfig<TParams, TQuery, TBody, TState, TRequestHeaders>): Promise<ApiResponse<TResponse>>;
    submit: (config: RequestConfig<TParams, TQuery, TBody, TState, TRequestHeaders>) => Promise<ApiResponse<TResponse>>;

    /**
     * @deprecated Use `computeRequestConfig` instead
     */
    computeConfig: <
      TParams extends Params | undefined,
      TQuery extends Query | undefined,
      TBody extends Body | undefined,
      TState extends State,
      TRequestHeaders extends RawHeaders | undefined,
    >(
      config: RequestConfig<TParams, TQuery, TBody, TState, TRequestHeaders>,
    ) => ComputedRequestConfig<TParams, TQuery, TBody, TState, TRequestHeaders>;

    computeRequestConfig: <
      TParams extends Params | undefined,
      TQuery extends Query | undefined,
      TBody extends Body | undefined,
      TState extends State,
      TRequestHeaders extends RawHeaders | undefined,
    >(
      config: RequestConfig<TParams, TQuery, TBody, TState, TRequestHeaders>,
    ) => ComputedRequestConfig<TParams, TQuery, TBody, TState, TRequestHeaders>;

    computePath: (path: string, config: RequestConfig) => string;
    getRequestBackend: () => RequestBackend;
  };

export default Endpoint;

export const createEndpoint = <
  TResponse = any,
  TParams extends Params | undefined = Params | undefined,
  TQuery extends Query | undefined = Query | undefined,
  TBody extends Body | undefined = Body | undefined,
  TState extends State = State,
  TPath extends string = string,
  TRequestHeaders extends RawHeaders | undefined = RawHeaders | undefined,
  TResponseHeaders extends RawHeaders | undefined = RawHeaders | undefined,
>(
  api: Api,
  options: EndpointOptions<TResponse, TParams, TQuery, TBody, TState, TPath, TRequestHeaders, TResponseHeaders>,
): Endpoint<TResponse, TParams, TQuery, TBody, TState, TPath, TRequestHeaders, TResponseHeaders> => {
  const info: EndpointInfo<TResponse, TParams, TQuery, TBody, TState, TPath, TRequestHeaders, TResponseHeaders> = {
    ...options,
    name: options.name || options.id,
    validation: options.validation || {},
  };

  const instance = {
    get api() {
      return api;
    },

    get id() {
      return info.id;
    },
    get method() {
      return info.method;
    },
    get path() {
      return info.path;
    },

    get description() {
      return info.description;
    },
    get config() {
      return info.config || {};
    },
    get responseType() {
      return info.responseType;
    },
    get mocking() {
      return info.mocking;
    },
    get validation() {
      return info.validation;
    },
    get baseUrl() {
      return api.baseUrl;
    },
    getRequestBackend() {
      return api.requestBackend;
    },

    async submit(config) {
      let mock = false;

      const apiMocking = api.mocking;
      if (apiMocking) {
        const mockingEnabled =
          (typeof apiMocking.enabled === "function" ? apiMocking.enabled() : apiMocking.enabled) ?? false;
        if (mockingEnabled) {
          if (!options.mocking?.handler) {
            throw new Error(`[api-def] Endpoint for '${options.path}' has no mocking`);
          }

          mock = true;
        }
      }

      return Requester.submit(this, config, mock ? options.mocking : null);
    },

    computeConfig(config) {
      return this.computeRequestConfig(config);
    },
    computeRequestConfig(config) {
      const apiDefaults = api.computeRequestConfig();

      return processRequestConfigs([apiDefaults, options.config, config]);
    },
    computePath(path, request) {
      let computedPath = path.startsWith("/") ? path : `/${path}`;
      if (request.params) {
        const keys = Object.keys(request.params);
        for (let i = 0; i < keys.length; i++) {
          const argName = keys[i];
          const argValue = request.params[argName];

          computedPath = computedPath.replace(`:${argName}`, argValue).replace(`{${argName}}`, argValue);
        }
      }
      if (computedPath.includes(":") || computedPath.includes("{")) {
        throw new Error(`[api-def] Not all path params have been resolved: '${computedPath}'`);
      }
      return computedPath;
    },
  } as Endpoint<TResponse, TParams, TQuery, TBody, TState, TPath, TRequestHeaders, TResponseHeaders>;

  const result = Object.assign((config: any) => {
    return instance.submit(config);
  }, instance);

  Object.defineProperty(result, "name", {
    value: info.name,
    writable: false,
  });

  return result;
};
