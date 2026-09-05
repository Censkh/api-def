import { EventResultType, RequestEvent, RequestMethod, ResponseType } from "../ApiConstants";
import type { ApiResponse, RequestMiddleware } from "../ApiTypes";
import type RequestContext from "../RequestContext";

export interface RequestCoalescingMiddlewareOptions {
  key?: (context: RequestContext) => string;
  predicate?: (context: RequestContext) => boolean;
}

interface CoalescedRequest {
  promise: Promise<ApiResponse>;
  reject: (error: unknown) => void;
  resolve: (response: ApiResponse) => void;
}

interface CoalescingRegistration {
  entry: CoalescedRequest;
  key: string;
  owner: boolean;
}

const defaultKey = (
  context: RequestContext,
  getIdentity: (value: object | undefined) => number | undefined,
): string => {
  const headers = Object.entries(context.requestConfig.headers ?? {})
    .filter(([, value]) => value !== undefined)
    .map(([name, value]) => [name.toLowerCase(), String(value)] as const)
    .sort(([firstName, firstValue], [secondName, secondValue]) =>
      firstName === secondName ? firstValue.localeCompare(secondValue) : firstName.localeCompare(secondName),
    );
  const retry = context.requestConfig.retry;
  const retryKey =
    retry && typeof retry === "object"
      ? [retry.maxAttempts, retry.minDelay, retry.maxDelay, getIdentity(retry.shouldRetry)]
      : retry;

  return JSON.stringify([
    getIdentity(context.api),
    getIdentity(context.backend),
    context.backend.id,
    context.method,
    context.requestUrl.href,
    context.responseType,
    context.requestConfig.credentials,
    context.requestConfig.browserCache,
    context.requestConfig.acceptableStatus,
    retryKey,
    getIdentity(context.validation.response),
    getIdentity(context.validation.responses),
    getIdentity(context.mocking ?? undefined),
    headers,
  ]);
};

const createEntry = (): CoalescedRequest => {
  let resolve!: (response: ApiResponse) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<ApiResponse>((entryResolve, entryReject) => {
    resolve = entryResolve;
    reject = entryReject;
  });
  promise.catch(() => undefined);
  return { promise, reject, resolve };
};

const RequestCoalescingMiddleware = (options: RequestCoalescingMiddlewareOptions = {}): RequestMiddleware => {
  let nextIdentity = 1;
  const identities = new WeakMap<object, number>();
  const requests = new Map<string, CoalescedRequest>();
  const registrations = new WeakMap<RequestContext, CoalescingRegistration>();
  const getIdentity = (value: object | undefined): number | undefined => {
    if (!value) {
      return undefined;
    }
    const existing = identities.get(value);
    if (existing) {
      return existing;
    }
    const identity = nextIdentity++;
    identities.set(value, identity);
    return identity;
  };

  return {
    [RequestEvent.BEFORE_REQUEST]: async (context) => {
      if (
        context.method !== RequestMethod.GET ||
        context.responseType === ResponseType.STREAM ||
        context.responseType === ResponseType.WEBSOCKET ||
        typeof context.requestConfig.lock === "string" ||
        (options.predicate && !options.predicate(context))
      ) {
        return;
      }

      const key = options.key?.(context) ?? defaultKey(context, getIdentity);
      const existing = requests.get(key);
      if (existing) {
        registrations.set(context, { entry: existing, key, owner: false });
        context.stats.coalesced = true;
        const response = await existing.promise;
        return {
          type: EventResultType.RESPOND,
          response: {
            ...response,
            state: context.requestConfig.state,
            stats: context.stats,
          },
        };
      }

      const entry = createEntry();
      requests.set(key, entry);
      registrations.set(context, { entry, key, owner: true });
    },
    [RequestEvent.FINALLY]: (context) => {
      const registration = registrations.get(context);
      registrations.delete(context);
      if (!registration?.owner) {
        return;
      }

      if (requests.get(registration.key) === registration.entry) {
        requests.delete(registration.key);
      }

      if (context.error) {
        registration.entry.reject(context.error);
      } else if (context.response) {
        registration.entry.resolve(context.response);
      } else {
        registration.entry.reject(new Error("[api-def] Coalesced request finished without a response"));
      }
    },
  };
};

export default RequestCoalescingMiddleware;
