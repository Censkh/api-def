import Endpoint, {EndpointConfig} from "./Endpoint";
import * as Requester from "./Requester";
import {
    BaseRequestConfig,
    Body,
    ModulePossiblyDefault,
    Params,
    Query,
    RequestConfig,
    RequestEventHandlers,
    RequestHost,
    RequestMethod,
    RequestMiddleware,
    ResponseType,
} from "./ApiTypes";
import {EndpointMockingInfo, MockingConfig} from "./Mocking";
import RequestBackend from "./backend/RequestBackend";
import EndpointBuilder from "./EndpointBuilder";

export let requestBackend: RequestBackend | null = null;

export const setRequestBackend = (backendClass: { new(): RequestBackend }) => {
    requestBackend = new backendClass();
};

export interface ApiInfo {
    readonly name: string;
    readonly baseUrl: string;
    readonly middleware?: RequestMiddleware[];
    readonly defaults?: BaseRequestConfig;
    readonly mocking?: MockingConfig;
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
        const computedConfig: RequestConfig<P, Q, B> = Object.assign(
            {},
            this.api.defaults || {},
            config,
        );
        computedConfig.options = Object.assign(
            {},
            this.api.defaults?.options || {},
            config?.options || {},
        );
        return computedConfig;
    }

    computePath(path: string, config: RequestConfig): string {
        return path.startsWith("/") ? path : `/${path}`;
    }
}

export class Api implements ApiInfo {
    readonly baseUrl: string;
    readonly name: string;
    readonly middleware: RequestMiddleware[];
    readonly defaults: BaseRequestConfig;
    readonly mocking: ApiMocking | undefined;

    private readonly endpoints: Record<string, Endpoint> = {};

    constructor(info: ApiInfo) {
        this.name = info.name;
        this.baseUrl = info.baseUrl;
        this.middleware = info.middleware || [];
        this.endpoints = {};
        this.defaults = info.defaults || {};
        this.mocking =
            info.mocking &&
            Object.assign(info.mocking, {
                loaderPromise: null,
                loaded: false,
            });
    }

    endpoint(): EndpointBuilder {
        return new EndpointBuilder(this);
    }

    getEventHandlers(): RequestEventHandlers<any> {
        return {};
    }

    async get(path: string, config: RequestConfig) {
        return await Requester.submit(
            new HotRequestHost(this, path, RequestMethod.Get),
            config,
        );
    }

    async post(path: string, config: RequestConfig) {
        return await Requester.submit(
            new HotRequestHost(this, path, RequestMethod.Post),
            config,
        );
    }

    getEndpointMocks(): Record<string, EndpointMockingInfo | null> {
        return Object.keys(this.endpoints).reduce((mocks, key) => {
            (mocks as any)[key] = this.endpoints[key].mocking;
            return mocks;
        }, {});
    }
}
