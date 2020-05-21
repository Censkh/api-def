import {Api}          from "./Api";
import * as Requester from "./Requester";

import {
  ApiResponse,
  BaseRequestConfig,
  Body,
  Params,
  Query,
  RequestConfig,
  RequestHost,
  RequestMethod,
  ResponseType,
}                                             from "./ApiTypes";
import * as Mocking                           from "./Mocking";
import {EndpointMockingInfo, MockingFunction} from "./Mocking";

export interface EndpointConfig<R,
  P extends Params | undefined,
  Q extends Query | undefined,
  B extends Body | undefined> {
  readonly id: string;
  readonly method: RequestMethod;
  readonly name: string;
  readonly description: string;
  readonly path: string;
  readonly defaults?: BaseRequestConfig;
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
  readonly description: string;
  readonly path: string;
  readonly defaults?: BaseRequestConfig;
  readonly responseType: ResponseType;

  public mocking: EndpointMockingInfo<R, P, Q, B> | null = null;

  constructor(api: Api, info: EndpointConfig<R, P, Q, B>) {
    this.api = api;
    this.id = info.id;
    this.method = info.method;
    this.name = info.name;
    this.description = info.description;
    this.path = info.path;
    this.defaults = info.defaults;
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
    const computedConfig: RequestConfig<P, Q, B> = Object.assign(
      {},
      this.api.defaults || {},
      this.defaults || {},
      config,
    );

    // merge other values
    for (const key of ["options", "headers"]) {
      (computedConfig as any)[key] = Object.assign(
        {},
        this.api.defaults ? (this.api.defaults as any)[key] : {},
        this.defaults ? (this.defaults as any)[key] : {},
        (config as any)[key] ?? {},
      );
    }

    return computedConfig;
  }
}
