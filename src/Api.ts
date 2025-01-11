import { RequestMethod } from "./ApiConstants";
import type {
  ApiResponse,
  BaseRequestConfig,
  Body,
  ComputedRequestConfig,
  Params,
  Query,
  RequestConfig,
  RequestHost,
  RequestMiddleware,
  State,
} from "./ApiTypes";
import type Endpoint from "./Endpoint";
import EndpointBuilder from "./EndpointBuilder";
import type { ApiMockingConfig } from "./MockingTypes";
import { computeRequestConfig } from "./RequestConfig";
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

export interface ApiInfo {
  readonly name: string;
  readonly baseUrl: string;
  readonly middleware?: RequestMiddleware[];
  readonly config?: BaseRequestConfig | (() => BaseRequestConfig);
  readonly mocking?: ApiMockingConfig;
  readonly requestBackend?: RequestBackend;
}

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
  >(config: RequestConfig<TParams, TQuery, TBody, TState>): ComputedRequestConfig<TParams, TQuery, TBody, TState> {
    const apiDefaults = this.api.getConfig();

    return computeRequestConfig([apiDefaults, config]);
  }

  computePath(path: string, config: RequestConfig): string {
    return path.startsWith("/") ? path : `/${path}`;
  }

  getRequestBackend(): RequestBackend {
    return this.api.getRequestBackend();
  }
}

export class Api implements ApiInfo {
  readonly baseUrl: string;
  readonly name: string;
  readonly middleware: RequestMiddleware[];
  readonly config?: BaseRequestConfig | (() => BaseRequestConfig);
  readonly mocking?: ApiMockingConfig;
  readonly requestBackend: RequestBackend;

  protected readonly endpoints: Record<string, Endpoint> = {};

  constructor(info: ApiInfo) {
    this.name = info.name;
    this.baseUrl = info.baseUrl;
    this.middleware = info.middleware || [];
    this.endpoints = {};
    this.config = info.config;
    this.mocking = info.mocking ?? undefined;
    const requestBackend = info.requestBackend ?? getRequestBackend();
    if (!requestBackend) {
      throw new Error(
        "[api-def] No request backend provided in either Api options or globally, use `setRequestBackend()` to set one or pass one via `requestBackend`",
      );
    }
    this.requestBackend = requestBackend;
  }

  endpoint(): EndpointBuilder {
    return new EndpointBuilder(this);
  }

  getRequestBackend(): RequestBackend {
    return this.requestBackend;
  }

  getConfig(): BaseRequestConfig {
    return (typeof this.config === "function" ? this.config() : this.config) || {};
  }

  reconfigure(info: Partial<ApiInfo>): void {
    if (info.requestBackend) {
      (this as any).requestBackend = info.requestBackend;
    }
    if (info.config) {
      (this as any).config = info.config;
    }
    if (info.middleware) {
      (this as any).middleware = info.middleware;
    }
    if (info.mocking) {
      (this as any).mocking = info.mocking;
    }
    if (info.baseUrl) {
      (this as any).baseUrl = info.baseUrl;
    }
  }

  private hotRequest =
    (requestMethod: RequestMethod) =>
    async <R = unknown>(path: string, config: RequestConfig): Promise<ApiResponse<R>> =>
      await Requester.submit(new HotRequestHost(this, path, requestMethod), config, null);

  public get = this.hotRequest(RequestMethod.GET);
  public post = this.hotRequest(RequestMethod.POST);
  public put = this.hotRequest(RequestMethod.PUT);
  public delete = this.hotRequest(RequestMethod.DELETE);
  public patch = this.hotRequest(RequestMethod.PATCH);
}
