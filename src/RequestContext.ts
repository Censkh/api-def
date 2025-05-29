import type { Api } from "./Api";
import type { RequestEvent, RequestMethod, ResponseType } from "./ApiConstants";
import type {
  ApiResponse,
  Body,
  ComputedRequestConfig,
  EventResult,
  Params,
  Query,
  RawHeaders,
  RequestCacheInfo,
  RequestEventHandlers,
  RequestHost,
  RequestStats,
  State,
} from "./ApiTypes";
import { resolveUrl } from "./ApiUtils";
import type { EndpointMockingConfig } from "./MockingTypes";
import type { RequestError } from "./RequestError";
import * as Utils from "./Utils";
import type { Validation } from "./Validation";
import type RequestBackend from "./backend/RequestBackend";

let contextIdCounter = 0;

export default class RequestContext<
  TResponse = any,
  TParams extends Params | undefined = Params | undefined,
  TQuery extends Query | undefined = Query | undefined,
  TBody extends Body | undefined = Body | undefined,
  TState extends State = State,
> {
  readonly id: number;
  readonly key: string;
  private computedPath: string;
  private computedBaseUrl: string;
  private computedMethod: RequestMethod;
  readonly stats: RequestStats;
  private readonly host: RequestHost;
  readonly eventHandlers: RequestEventHandlers<TResponse>;

  readonly backend: RequestBackend;

  private canceler: (() => void) | null = null;
  response: ApiResponse<TResponse> | null | undefined = undefined;
  error: RequestError | null = null;
  readonly cacheInfo: RequestCacheInfo = { cached: false, source: null };

  cancelled = false;

  readonly requestConfig: ComputedRequestConfig<TParams, TQuery, TBody, TState>;
  private computedRequestUrl: URL;

  readonly mocking: EndpointMockingConfig<TResponse, TParams, TQuery, TBody, TState> | null | undefined;

  private parsedBody: any;

  readonly validation: Validation<TResponse, TParams, TQuery, TBody, TState>;

  constructor(
    backend: RequestBackend,
    host: RequestHost,
    config: ComputedRequestConfig<TParams, TQuery, TBody, TState>,
    computedPath: string,
    mocking: EndpointMockingConfig<TResponse, TParams, TQuery, TBody, TState> | null | undefined,
  ) {
    this.backend = backend;
    this.id = contextIdCounter++;
    this.host = host;
    this.requestConfig = config;
    Utils.assign({}, this.requestConfig.headers);
    this.computedPath = computedPath;
    this.computedBaseUrl = host.baseUrl;
    this.computedMethod = host.method;

    this.key = this.generateKey();
    this.stats = {
      attempt: 0,
      cached: false,
      startTimestamp: Date.now(),
    };
    this.eventHandlers = {};
    this.mocking = mocking;
    this.validation = host.validation as any;
    this.initMiddleware();
    this.parseRequestBody();
    this.computedRequestUrl = this.resolveRequestUrl();
  }

  /**
   * @deprecated Use `requestConfig` instead
   */
  get computedConfig(): ComputedRequestConfig<TParams, TQuery, TBody, TState> {
    return this.requestConfig;
  }

  get method(): RequestMethod {
    return this.computedMethod;
  }

  get api(): Api {
    return this.host.api;
  }

  get baseUrl(): string {
    return this.computedBaseUrl;
  }

  get responseType(): ResponseType | undefined {
    return this.host.responseType;
  }

  private initMiddleware(): void {
    const { middleware } = this.api;
    for (let i = 0; i < middleware.length; i++) {
      const events = middleware[i];
      const eventTypes = Object.keys(events);
      for (let n = 0; n < eventTypes.length; n++) {
        const eventType = eventTypes[n] as RequestEvent;
        const eventHandlersForType = this.eventHandlers[eventType] || (this.eventHandlers[eventType] = []);
        const middlewareEventHandlers = events[eventType];
        if (middlewareEventHandlers) {
          eventHandlersForType.push(middlewareEventHandlers);
        }
      }
    }
  }

  private generateKey() {
    let key = this.computedPath.trim();

    if (this.requestConfig.queryString) {
      key += `?${this.requestConfig.queryString}`;
    }

    return key;
  }

  updateHeaders(newHeaders: RawHeaders): this {
    this.requestConfig.headers = Utils.assign({}, this.requestConfig.headers, newHeaders);
    this.parseRequestBody();
    return this;
  }

  private parseRequestBody() {
    if (this.requestConfig.body && this.requestConfig.headers) {
      const contentTypeKey = Object.keys(this.requestConfig.headers).find(
        (key) => key.toLowerCase() === "content-type",
      );
      const contentType = contentTypeKey && this.requestConfig.headers[contentTypeKey]?.toString().split(";")[0].trim();
      if (contentType === "application/x-www-form-urlencoded") {
        const searchParams = new URLSearchParams();
        for (const key of Object.keys(this.requestConfig.body)) {
          const value = (this.requestConfig.body as any)[key];
          searchParams.append(key, value?.toString());
        }
        this.parsedBody = searchParams;
      } else {
        this.parsedBody = this.requestConfig.body;
      }
    } else {
      this.parsedBody = undefined;
    }
  }

  getParsedBody(): any {
    return this.parsedBody;
  }

  updateQuery(newQuery: Partial<TQuery>): this {
    this.requestConfig.queryObject = Utils.assign({}, this.requestConfig.queryObject, newQuery);
    this.computedRequestUrl = this.resolveRequestUrl();
    return this;
  }

  async triggerEvent(eventType: RequestEvent): Promise<EventResult<TResponse> | undefined> {
    const eventHandlers = this.eventHandlers[eventType];
    if (eventHandlers) {
      for (let i = 0; i < eventHandlers.length; i++) {
        const eventHandler = eventHandlers[i];
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

  get requestUrl(): URL {
    return this.computedRequestUrl;
  }

  get path(): string {
    return this.computedPath;
  }

  updatePath(path: string): void {
    this.computedPath = path;
    this.computedRequestUrl = this.resolveRequestUrl();
  }

  updateBaseUrl(baseUrl: string): void {
    this.computedBaseUrl = baseUrl;
    this.computedRequestUrl = this.resolveRequestUrl();
  }

  updateMethod(method: RequestMethod): void {
    this.computedMethod = method;
  }

  updateBody(body: TBody): void {
    // @ts-ignore
    this.requestConfig.body = body;
    this.parseRequestBody();
  }

  private resolveRequestUrl(): URL {
    const url = resolveUrl(this.baseUrl, this.computedPath);
    if (this.requestConfig.queryString) {
      url.search = this.requestConfig.queryString;
    }

    return url;
  }
}
