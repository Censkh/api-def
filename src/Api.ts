import Endpoint                             from "./Endpoint";
import * as Requester                       from "./Requester";
import {
  ApiResponse,
  BaseRequestConfig,
  Body,
  ModulePossiblyDefault,
  Params,
  Query,
  RequestConfig,
  RequestEventHandlers,
  RequestHost,
  RequestMiddleware,
}                                           from "./ApiTypes";
import {EndpointMockingInfo, LiveMockingConfig, MockingConfig} from "./Mocking";
import RequestBackend                       from "./backend/RequestBackend";
import EndpointBuilder                      from "./EndpointBuilder";
import * as Utils                           from "./Utils";
import FetchRequestBackend                  from "./backend/FetchRequestBackend";
import {RequestMethod, ResponseType}        from "./ApiConstants";

// use fetch as default if it is present
export let requestBackend: RequestBackend | null = Utils.getGlobalFetch() ? new FetchRequestBackend() : null;
export let requestBackendIsDefault = true;

export const setRequestBackend = (backend: RequestBackend): void => {
  requestBackendIsDefault = false;
  requestBackend = backend;
};

export interface ApiInfo {
  readonly name: string;
  readonly baseUrl: string;
  readonly middleware?: RequestMiddleware[];
  readonly config?: BaseRequestConfig | (() => BaseRequestConfig);
  readonly mocking?: MockingConfig;
  readonly liveMocking?: LiveMockingConfig;
}

export interface ApiMocking extends MockingConfig {
  loaderPromise: null | Promise<ModulePossiblyDefault<any>>;
  loaded: boolean;
}

class HotRequestHost implements RequestHost {
  readonly api: Api;
  readonly method: RequestMethod;
  readonly path: string;
  readonly responseType = ResponseType.Json;

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
    B extends Body | undefined>(config: RequestConfig<P, Q, B>): RequestConfig<P, Q, B> {
    const apiDefaults = this.api.getConfig();

    return Utils.assign(
      {},
      apiDefaults,
      config,
    );
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
  readonly mocking: ApiMocking | undefined;
  readonly liveMocking?: LiveMockingConfig;

  private readonly endpoints: Record<string, Endpoint> = {};

  constructor(info: ApiInfo) {
    this.name = info.name;
    this.baseUrl = info.baseUrl;
    this.middleware = info.middleware || [];
    this.endpoints = {};
    this.config = info.config;
    this.mocking =
      info.mocking &&
      Utils.assign(info.mocking, {
        loaderPromise: null,
        loaded       : false,
      });
    this.liveMocking = info.liveMocking;
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

  getEventHandlers(): RequestEventHandlers<any> {
    return {};
  }

  private hotRequest = (requestMethod: RequestMethod) => async <R = unknown>(path: string, config: RequestConfig): Promise<ApiResponse<R>> => (
    await Requester.submit(
      new HotRequestHost(this, path, requestMethod),
      config,
    )
  );

  public get    = this.hotRequest(RequestMethod.GET);
  public post   = this.hotRequest(RequestMethod.POST);
  public put    = this.hotRequest(RequestMethod.PUT);
  public delete = this.hotRequest(RequestMethod.DELETE);

  getEndpointMocks(): Record<string, EndpointMockingInfo | null> {
    return Object.keys(this.endpoints).reduce((mocks, key) => {
      (mocks as any)[key] = this.endpoints[key].mocking;
      return mocks;
    }, {});
  }
}
