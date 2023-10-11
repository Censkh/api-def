import RequestContext from "./RequestContext";
import { Api } from "./Api";
import { CacheSource, EventResultType, RequestEvent, RequestMethod, ResponseType } from "./ApiConstants";

export type AcceptableStatus = number | [ min: number, max: number ];

export type Headers = Record<string, string | number | boolean | null | undefined>;

export type Params = string;
export type Query = string | undefined | Record<string, any>;
export type Body = string | number | Record<string, any>;

export interface ApiResponse<T = any> {
  readonly method: RequestMethod;
  readonly url: string;
  readonly status: number;
  readonly data: T;
  readonly headers: Record<string, string>;
}

export type RequestLock = string | false;

export type QueryStringify = (query: any) => string;
export type QueryParse = (query: string) => any;

interface QueryHandling {
  parse: QueryParse;
  stringify: QueryStringify;
}

export interface BaseRequestConfig {
  cache?: number | boolean;
  lock?: RequestLock;
  retry?: number | false;
  headers?: Readonly<Headers>;
  acceptableStatus?: AcceptableStatus[];
  /**
   * @deprecated use `queryHandling.stringify` instead
   **/
  queryParser?: QueryStringify,
  queryHandling?: Partial<QueryHandling>
}

export type RequestConfig<P extends Params | undefined = Params | undefined,
  Q extends Query | undefined = Query | undefined,
  B extends Body | undefined = Body | undefined> = (P extends undefined
  ? { params?: never }
  : { params: Record<P extends Params ? P : never, string> }) &
  (Q extends undefined ? { query?: never } : { query: Q }) &
  (B extends undefined ? { body?: never } : { body: B }) &
  BaseRequestConfig;

export const COMPUTED_CONFIG_SYMBOL = Symbol("computed");

export type ComputedRequestConfig<P extends Params | undefined = Params | undefined,
  Q extends Query | undefined = Query | undefined,
  B extends Body | undefined = Body | undefined> =
  Omit<RequestConfig<P, Q, B>, "queryParser" | "query" | "queryHandling">
  & {
  [COMPUTED_CONFIG_SYMBOL]: true,

  queryObject: Record<string, any> | undefined,
  queryString: string | undefined,
  queryHandling: QueryHandling
};

interface BaseEventResult<T extends EventResultType> {
  type: T;
}

export type ResponseEventResult<R> = BaseEventResult<"respond"> & {
  response: ApiResponse<R>;
};

export type RetryEventResult<R> = BaseEventResult<"retry">;

export type EventResult<R> = ResponseEventResult<R> | RetryEventResult<R>;

export type RequestEventHandler<R> = (
  context: RequestContext<R>,
) => EventResult<R> | void | Promise<EventResult<R> | void>;

export type RequestEventHandlers<R> = {
  [key in RequestEvent]?: Array<RequestEventHandler<R>>;
};

export type RequestMiddleware<O = undefined> = {
  [key in RequestEvent]?: RequestEventHandler<any> | undefined | false;
};

export interface RequestContextStats {
  cached: false | { is: true; by: "local" | "api" };
  attempt: number;
}

export interface RequestHost {
  readonly method: RequestMethod;
  readonly api: Api;
  readonly baseUrl: string;
  readonly path: string;
  readonly responseType: ResponseType | undefined;

  computeConfig<P extends Params | undefined,
    Q extends Query | undefined,
    B extends Body | undefined>(
    config: RequestConfig<P, Q, B>,
  ): ComputedRequestConfig<P, Q, B>;

  computePath(path: string, config: RequestConfig): string;
}

export interface CancelledRequestError extends Error {
  isCancelledRequest: true;
}

export interface RequestCacheInfo {
  cached: boolean;
  source: CacheSource | null;
}

