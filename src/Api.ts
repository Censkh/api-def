import { RequestMethod } from "./ApiConstants";
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
import { resolveUrl } from "./ApiUtils";
import type Endpoint from "./Endpoint";
import EndpointBuilder from "./EndpointBuilder";
import type { ApiMockingConfig } from "./MockingTypes";
import { processRequestConfigs } from "./RequestConfig";
import * as Requester from "./Requester";
import * as Utils from "./Utils";
import type { Validation } from "./Validation";
import FetchRequestBackend from "./backend/FetchRequestBackend";
import type RequestBackend from "./backend/RequestBackend";

// use fetch as default if it is present
let requestBackend: RequestBackend | null = Utils.getGlobalFetch() ? new FetchRequestBackend() : null;
let requestBackendIsDefault = true;

export const getRequestBackend = (): RequestBackend | null => {
  return requestBackend;
};

export const isRequestBackendDefault = (): boolean => {
  return requestBackendIsDefault;
};

export const setRequestBackend = (backend: RequestBackend): void => {
  requestBackendIsDefault = false;
  requestBackend = backend;
};

export interface ApiOptions {
  readonly name: string;
  readonly baseUrl: string;
  readonly middleware?: RequestMiddleware[];
  /** @deprecated use `defaultRequestConfig` instead */
  readonly config?: BaseRequestConfig | (() => BaseRequestConfig);
  readonly defaultRequestConfig?: BaseRequestConfig | (() => BaseRequestConfig);
  readonly mocking?: ApiMockingConfig;
  readonly requestBackend?: RequestBackend;
}

export type ApiInfo = Omit<ApiOptions, "config"> & Required<Pick<ApiOptions, "middleware" | "requestBackend">>;

class HotRequestHost implements RequestHost {
  readonly api: Api;
  readonly method: RequestMethod;
  readonly path: string;
  readonly responseType = undefined;
  readonly validation: Validation = {};

  constructor(api: Api, path: string, method: RequestMethod) {
    this.api = api;
    this.method = method;
    this.path = path;
  }

  get baseUrl(): string {
    return this.api.baseUrl;
  }

  computeConfig<
    TParams extends Params | undefined,
    TQuery extends Query | undefined,
    TBody extends Body | undefined,
    TState extends State,
    TRequestHeaders extends RawHeaders | undefined,
  >(
    config: RequestConfig<TParams, TQuery, TBody, TState, TRequestHeaders>,
  ): ComputedRequestConfig<TParams, TQuery, TBody, TState, TRequestHeaders> {
    const apiDefaults = this.api.computeRequestConfig();

    return processRequestConfigs([apiDefaults, config]);
  }

  getRequestBackend(): RequestBackend {
    return this.api.requestBackend;
  }
}

export class Api implements ApiInfo {
  private readonly info: ApiInfo;

  protected readonly endpoints: Record<string, Endpoint> = {};

  //private mutable = false;
  //private wasMutable = false;

  constructor(
    options: ApiOptions & {
      readonly mutable?: boolean;
    },
  ) {
    const requestBackend = options.requestBackend ?? getRequestBackend();
    if (!requestBackend) {
      throw new Error(
        "[api-def] No request backend provided in either Api options or globally, use `setRequestBackend()` to set one or pass one via `requestBackend`",
      );
    }

    this.info = {
      name: options.name,
      baseUrl: options.baseUrl,
      middleware: options.middleware || [],
      defaultRequestConfig: options.defaultRequestConfig ?? options.config ?? undefined,
      mocking: options.mocking ?? undefined,
      requestBackend: requestBackend,
    };
    //this.mutable = options.mutable ?? false;
    //this.wasMutable = this.mutable;
    this.endpoints = {};
  }

  get requestBackend(): RequestBackend {
    return this.info.requestBackend;
  }

  get baseUrl(): string {
    return this.info.baseUrl;
  }

  /**
   * @deprecated use `defaultRequestConfig` instead
   */
  get config(): BaseRequestConfig | (() => BaseRequestConfig) | undefined {
    return this.info.defaultRequestConfig;
  }

  get defaultRequestConfig(): BaseRequestConfig | (() => BaseRequestConfig) | undefined {
    return this.info.defaultRequestConfig;
  }

  get middleware(): RequestMiddleware[] {
    return this.info.middleware;
  }

  get mocking(): ApiMockingConfig | undefined {
    return this.info.mocking;
  }

  get name(): string {
    return this.info.name;
  }

  endpoint(): EndpointBuilder {
    return new EndpointBuilder(this);
  }

  /**
   * @deprecated use `requestBackend` instead
   */
  getRequestBackend(): RequestBackend {
    return this.requestBackend;
  }

  /**
   * @deprecated use `computeRequestConfig()` instead
   */
  getConfig(): BaseRequestConfig {
    return this.computeRequestConfig();
  }

  computeRequestConfig(): BaseRequestConfig {
    return (
      (typeof this.defaultRequestConfig === "function" ? this.defaultRequestConfig() : this.defaultRequestConfig) || {}
    );
  }

  /*configure(info: Partial<ApiInfo>): void {
    if (!this.mutable) {
      throw new Error(
        `[api-def] ${this.wasMutable ? "Cannot configure a mutable API twice" : "Cannot configure an immutable API"}`,
      );
    }

    Object.assign(this.info, info);
    this.mutable = false;
  }*/

  private hotRequest =
    (requestMethod: RequestMethod) =>
    async <R = unknown>(path: string, config: RequestConfig): Promise<ApiResponse<R>> =>
      await Requester.submit(new HotRequestHost(this, path, requestMethod), config, null);

  public get = this.hotRequest(RequestMethod.GET);
  public post = this.hotRequest(RequestMethod.POST);
  public put = this.hotRequest(RequestMethod.PUT);
  public delete = this.hotRequest(RequestMethod.DELETE);
  public patch = this.hotRequest(RequestMethod.PATCH);

  resolveUrl(path: string): URL {
    return resolveUrl(this.baseUrl, path);
  }
}
