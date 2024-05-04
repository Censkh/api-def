import type { Api } from "./Api";
import type { CacheSource, EventResultType, RequestEvent, RequestMethod, ResponseType } from "./ApiConstants";
import type RequestContext from "./RequestContext";
import type { Validation } from "./Validation";
import type RequestBackend from "./backend/RequestBackend";

export type AcceptableStatus = number | [min: number, max: number];

export type Headers = Record<string, string | number | boolean | null | undefined>;

export type Params = string;
export type Query = string | undefined | Record<string, any>;
export type Body = string | number | Record<string, any>;
export type State = Record<string, any>;

export interface ApiResponse<T = any> {
  readonly method: RequestMethod;
  readonly url: string;
  readonly status: number;
  readonly data: T;
  readonly headers: Record<string, string>;
  readonly state: State;
}

export type RequestLock = string | false;

export type QueryStringify = (query: any) => string;
export type QueryParse = (query: string) => any;

interface QueryHandling {
  parse: QueryParse;
  stringify: QueryStringify;
}

export interface RetryOptions {
  maxAttempts: number;
  shouldRetry?: (error: Error) => boolean;
  minDelay?: number;
  maxDelay?: number;
}

export interface BaseRequestConfig {
  cache?: number | boolean;
  lock?: RequestLock;
  includeCredentials?: boolean;
  retry?: number | false | RetryOptions;
  headers?: Readonly<Headers>;
  acceptableStatus?: AcceptableStatus[];
  /**
   * @deprecated use `queryHandling.stringify` instead
   **/
  queryParser?: QueryStringify;
  queryHandling?: Partial<QueryHandling>;
}

export type RequestConfig<
  TParams extends Params | undefined = Params | undefined,
  TQuery extends Query | undefined = Query | undefined,
  TBody extends Body | undefined = Body | undefined,
  TState extends State = State,
> = (TParams extends undefined
  ? { params?: never }
  : { params: Record<TParams extends Params ? TParams : never, string> }) &
  (TQuery extends undefined ? { query?: never } : { query: TQuery }) &
  (TBody extends undefined ? { body?: never } : { body: TBody }) &
  ({  } extends TState  ? { state?: TState } : { state: TState })
  & BaseRequestConfig;

export const COMPUTED_CONFIG_SYMBOL = Symbol("computed");

export type ComputedRequestConfig<
  TParams extends Params | undefined = Params | undefined,
  TQuery extends Query | undefined = Query | undefined,
  TBody extends Body | undefined = Body | undefined,
  TState extends State = State,
> = Omit<RequestConfig<TParams, TQuery, TBody, TState>, "queryParser" | "query" | "queryHandling" | "state"> & {
  [COMPUTED_CONFIG_SYMBOL]: true;

  state: TState;

  queryObject: Record<string, any> | undefined;
  queryString: string | undefined;
  queryHandling: QueryHandling;
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
  readonly validation: Validation;

  computeConfig<
    TParams extends Params | undefined,
    TQuery extends Query | undefined,
    TBody extends Body | undefined,
    TState extends State,
  >(config: RequestConfig<TParams, TQuery, TBody, TState>): ComputedRequestConfig<TParams, TQuery, TBody, TState>;

  computePath(path: string, config: RequestConfig): string;

  getRequestBackend(): RequestBackend;
}

export interface CancelledRequestError extends Error {
  isCancelledRequest: true;
}

export interface RequestCacheInfo {
  cached: boolean;
  source: CacheSource | null;
}
