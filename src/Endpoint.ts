import { Api } from "./Api";
import * as Requester from "./Requester";

import { ApiResponse, BaseRequestConfig, Body, Params, Query, RequestConfig, RequestHost } from "./ApiTypes";
import * as Mocking from "./Mocking";
import * as Utils from "./Utils";
import { RequestMethod, ResponseType } from "./ApiConstants";

export interface EndpointConfig<R,
                                P extends Params | undefined,
                                Q extends Query  | undefined,
                                B extends Body   | undefined> {
  readonly id          : string;
  readonly method      : RequestMethod;
  readonly path        : string;

  /**
   * Name your endpoint to help with debugging and documentation
   * @default `id` is used as the name if no name is supplied
   */
  readonly name?        : string;
  /**
   * Describe your endpoint to help with debugging and documentation
   */
  readonly description? : string;
  readonly config?      : BaseRequestConfig;
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
  readonly mocking?: Mocking.EndpointMockingConfig<R, P, Q, B>;
}

export default class Endpoint<R = any,
                              P extends Params | undefined = Params | undefined,
                              Q extends Query  | undefined = Query  | undefined,
                              B extends Body   | undefined = Body   | undefined> implements EndpointConfig<R, P, Q, B>, RequestHost {
  public readonly api: Api;

  readonly id            : string;
  readonly method        : RequestMethod;
  readonly name          : string;
  readonly description?  : string;
  readonly path          : string;
  readonly config?       : BaseRequestConfig;
  readonly responseType  : ResponseType;
  readonly mocking?      : Mocking.EndpointMockingConfig<R, P, Q, B>;

  constructor(api: Api, info: EndpointConfig<R, P, Q, B>) {
    this.api           = api;
    this.id            = info.id;
    this.method        = info.method;
    this.name          = info.name || info.id;
    this.description   = info.description;
    this.path          = info.path;
    this.config        = info.config;
    this.responseType  = info.responseType || ResponseType.Json;
    this.mocking       = info.mocking;
  }

  public async submit(config: RequestConfig<P, Q, B>): Promise<ApiResponse<R>> {

    const mockingEnabled = this.api.mocking?.required ?? false;

    if (mockingEnabled) {
      if (!this.mocking?.handler) {
        throw new Error(`[api-def] Endpoint for '${this.path}' has no mocking`);
      }

      mock = true;
    }

    return Requester.submit(this, config, mock ? this.mocking : null);
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
        `[api-def] Not all path params have been resolved: '${computedPath}'`,
      );
    }
    return computedPath;
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
