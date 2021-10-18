import {
  ApiResponse,
  Body,
  EventResult,
  Headers,
  Params,
  Query,
  RequestCacheInfo,
  RequestConfig,
  RequestContextStats,
  RequestEventHandlers,
  RequestHost,
  AcceptableStatus,
}                                                  from "./ApiTypes";
import {Api}                                       from "./Api";
import * as Utils                                  from "./Utils";
import {RequestEvent, RequestMethod, ResponseType} from "./ApiConstants";
import {EndpointMockingConfig}                     from "./MockingTypes";
import {RequestError}                              from "./RequestError";
import RequestBackend                              from "./backend/RequestBackend";

let contextIdCounter = 0;

export default class RequestContext<R = any,
  P extends Params | undefined = Params | undefined,
  Q extends Query | undefined = Query | undefined,
  B extends Body | undefined = Body | undefined> {
  readonly id: number;
  readonly key: string;
  readonly computedPath: string;
  readonly stats: RequestContextStats;
  private readonly host: RequestHost;
  readonly acceptableStatus?: AcceptableStatus[];
  readonly eventHandlers: RequestEventHandlers<R>;

  readonly backend: RequestBackend;

  private canceler: (() => void) | null = null;
  response: ApiResponse<R> | null | undefined = undefined;
  error: RequestError | null = null;
  readonly cacheInfo: RequestCacheInfo = {cached: false, source: null};

  cancelled = false;
  readonly computedConfig: RequestConfig<P, Q, B>;

  readonly mocking: EndpointMockingConfig<R, P, Q, B> | null | undefined;

  constructor(
    backend: RequestBackend,
    host: RequestHost,
    config: RequestConfig<P, Q, B>,
    computedPath: string,
    mocking: EndpointMockingConfig<R, P, Q, B> | null | undefined,
  ) {
    this.backend = backend;
    this.id = contextIdCounter++;
    this.host = host;
    this.computedConfig = config;
    Utils.assign({}, this.computedConfig.headers, {"Request-Id": this.id});
    this.computedPath = computedPath;

    this.key = this.generateKey();
    this.stats = {
      attempt: 0,
      cached : false,
    };
    this.eventHandlers = {};
    this.mocking = mocking;
    this.initMiddleware();
  }

  get method(): RequestMethod {
    return this.host.method;
  }

  get api(): Api {
    return this.host.api;
  }

  get baseUrl(): string {
    return this.host.baseUrl;
  }

  get responseType(): ResponseType {
    return this.host.responseType;
  }

  private initMiddleware(): void {
    const {middleware} = this.api;
    for (let i = 0; i < middleware.length; i++) {
      const events = middleware[i];
      const eventTypes = Object.keys(events);
      for (let n = 0; n < eventTypes.length; n++) {
        const eventType = eventTypes[n] as RequestEvent;
        const eventHandlersForType =
                this.eventHandlers[eventType] || (this.eventHandlers[eventType] = []);
        const middlewareEventHandlers = events[eventType];
        if (middlewareEventHandlers) {
          eventHandlersForType.push(middlewareEventHandlers);
        }
      }
    }
  }

  private generateKey() {
    const {computedConfig} = this;
    let key = this.computedPath.trim();

    const queryStrings = [];
    if (computedConfig.query) {
      const queryKeys = Object.keys(computedConfig.query);
      for (let i = 0; i < queryKeys.length; i++) {
        const queryKey = queryKeys[i];
        queryStrings.push(`${queryKey}=${computedConfig.query[queryKey]}`);
      }
    }
    if (queryStrings.length > 0) {
      key += "?" + queryStrings.join("&");
    }

    return key;
  }

  updateHeaders(newHeaders: Headers): this {
    this.computedConfig.headers = Utils.assign(
      {},
      this.computedConfig.headers,
      newHeaders,
    );
    return this;
  }

  updateQuery(newQuery: Partial<Q>): this {
    this.computedConfig.query = Utils.assign(
      this.computedConfig.query || {},
      newQuery,
    );
    return this;
  }

  async triggerEvent(
    eventType: RequestEvent,
  ): Promise<EventResult<R> | undefined> {
    const eventHandlers = this.eventHandlers[eventType];
    if (eventHandlers) {
      for (let i = 0; i < eventHandlers.length; i++) {
        const eventHandler = eventHandlers[i];
        // eslint-disable-next-line no-await-in-loop
        const eventResult = await eventHandler(this as RequestContext);
        if (eventResult) {
          return eventResult;
        }
      }
    }
    return undefined;
  }

  addCanceller(canceler: () => void): void {
    this.canceler = canceler;
  }

  cancel(): void {
    this.cancelled = true;
    if (this.canceler) {
      this.canceler();
    }
  }
}
