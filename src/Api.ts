import Endpoint from "./Endpoint";
import * as Requester from "./Requester";
import {
  ApiResponse,
  BaseRequestConfig,
  Body, ComputedRequestConfig,
  Params,
  Query,
  RequestConfig,
  RequestHost,
  RequestMiddleware,
} from "./ApiTypes";
import RequestBackend from "./backend/RequestBackend";
import EndpointBuilder from "./EndpointBuilder";
import * as Utils from "./Utils";
import FetchRequestBackend from "./backend/FetchRequestBackend";
import {
  RequestMethod,
} from "./ApiConstants";
import { ApiMockingConfig } from "./MockingTypes";
import { computeRequestConfig } from "./RequestConfig";

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
}

class HotRequestHost implements RequestHost {
  readonly api: Api;
  readonly method: RequestMethod;
  readonly path: string;
  readonly responseType = undefined;

  constructor(api: Api, path: string, method: RequestMethod) {
    this.api = api;
    this.method = method;
    this.path = path;
  }

  get baseUrl(): string {
    return this.api.baseUrl;
  }

  computeConfig<P extends Params | undefined,
    Q extends Query | undefined,
    B extends Body | undefined>(config: RequestConfig<P, Q, B>): ComputedRequestConfig<P, Q, B> {
    const apiDefaults = this.api.getConfig();

    return computeRequestConfig([
      apiDefaults,
      config,
    ]);
  }

  computePath(path: string, config: RequestConfig): string {
    return path.startsWith("/") ? path : `/${path}`;
  }
}

export class Api implements ApiInfo {
  readonly baseUrl: string;
  readonly name: string;
  readonly middleware: RequestMiddleware[];
  readonly config?: BaseRequestConfig | (() => BaseRequestConfig);
  readonly mocking?: ApiMockingConfig;

  protected readonly endpoints: Record<string, Endpoint> = {};

  constructor(info: ApiInfo) {
    this.name = info.name;
    this.baseUrl = info.baseUrl;
    this.middleware = info.middleware || [];
    this.endpoints = {};
    this.config = info.config;
    this.mocking = info.mocking ?? undefined;
  }

  endpoint(): EndpointBuilder {
    return new EndpointBuilder(this);
  }

  getConfig(): BaseRequestConfig {
    return (
      (typeof this.config === "function" ? this.config() : this.config) ||
      {}
    );
  }

  private hotRequest = (requestMethod: RequestMethod) => async <R = unknown>(path: string, config: RequestConfig): Promise<ApiResponse<R>> => (
    await Requester.submit(
      new HotRequestHost(this, path, requestMethod),
      config,
      null,
    )
  );

  public get = this.hotRequest(RequestMethod.GET);
  public post = this.hotRequest(RequestMethod.POST);
  public put = this.hotRequest(RequestMethod.PUT);
  public delete = this.hotRequest(RequestMethod.DELETE);
  public patch = this.hotRequest(RequestMethod.PATCH);

}
