import { Api } from "./Api";
import * as Requester from "./Requester";

import { ApiResponse, BaseRequestConfig, Body, Params, Query, RequestConfig, RequestHost } from "./ApiTypes";
import * as Mocking from "./Mocking";
import { EndpointMockingInfo, MockingFunction } from "./Mocking";
import * as Utils from "./Utils";
import { RequestMethod, ResponseType } from "./ApiConstants";

export interface EndpointConfig<R,
  P extends Params | undefined,
  Q extends Query | undefined,
  B extends Body | undefined> {
  readonly id: string;
  readonly method: RequestMethod;
  readonly name?: string;
  readonly description?: string;
  readonly path: string;
  readonly config?: BaseRequestConfig;
  readonly responseType?: ResponseType;
}

export default class Endpoint<R = any,
  P extends Params | undefined = Params | undefined,
  Q extends Query | undefined = Query | undefined,
  B extends Body | undefined = Body | undefined> implements EndpointConfig<R, P, Q, B>, RequestHost {
  public readonly api: Api;

  readonly id: string;
  readonly method: RequestMethod;
  readonly name: string;
  readonly description?: string;
  readonly path: string;
  readonly config?: BaseRequestConfig;
  readonly responseType: ResponseType;

  public mocking: EndpointMockingInfo<R, P, Q, B> | null = null;

  constructor(api: Api, info: EndpointConfig<R, P, Q, B>) {
    this.api = api;
    this.id = info.id;
    this.method = info.method;
    this.name = info.name || info.id;
    this.description = info.description;
    this.path = info.path;
    this.config = info.config;
    this.responseType = info.responseType || ResponseType.Json;
  }

  public async submit(config: RequestConfig<P, Q, B>): Promise<ApiResponse<R>> {
    const apiMocking = this.api.mocking;
    if (!this.mocking?.bypass && apiMocking?.predicate()) {
      if (apiMocking?.loader && !apiMocking.loaded) {
        await (apiMocking.loaderPromise ||
          (apiMocking.loaderPromise = apiMocking.loader()));
        apiMocking.loaded = true;
      }

      return Mocking.mockRequest(this, config);
    }

    return Requester.submit(this, config);
  }

  computePath(path: string, request: RequestConfig): string {
    let computedPath = path.startsWith("/") ? path : `/${path}`;
    if (request.params) {
      const keys = Object.keys(request.params);
      for (let i = 0; i < keys.length; i++) {
        const argName = keys[i];
        computedPath = computedPath.replace(
          `:${argName}`,
          request.params[argName],
        );
      }
    }
    if (computedPath.includes(":")) {
      throw new Error(
        `Not all path params have been resolved: '${computedPath}'`,
      );
    }
    return computedPath;
  }

  mock(mocker: MockingFunction<R, P, Q, B>): this {
    this.mocking = {
      func: mocker,
    };
    return this;
  }

  mockBypass(): this {
    this.mocking = {
      bypass: true,
    };
    return this;
  }

  get baseUrl(): string {
    return this.api.baseUrl;
  }

  computeConfig<P extends Params | undefined,
    Q extends Query | undefined,
    B extends Body | undefined>(config: RequestConfig<P, Q, B>): RequestConfig<P, Q, B> {
    const apiDefaults = this.api.getConfig();
    const computedConfig: RequestConfig<P, Q, B> = Utils.assign(
      {},
      apiDefaults,
      this.config,
      config,
    );

    // merge other values
    for (const key of ["headers"]) {
      (computedConfig as any)[key] = Utils.assign(
        {},
        (apiDefaults as any)[key],
        this.config ? (this.config as any)[key] : undefined,
        (config as any)[key],
      );
    }

    return computedConfig;
  }
}
