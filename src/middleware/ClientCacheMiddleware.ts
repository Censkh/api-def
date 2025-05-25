import { CacheSource, EventResultType, RequestEvent, RequestMethod } from "../ApiConstants";
import type { RequestMiddleware } from "../ApiTypes";
import * as ClientCaching from "../cache/ClientCaching";

export interface ClientCacheMiddlewareOptions {
  defaultExpiry?: number;
  predicate?: () => boolean;
}

const ClientCacheMiddleware = (options: ClientCacheMiddlewareOptions = {}): RequestMiddleware => {
  return {
    [RequestEvent.SUCCESS]: async (context) => {
      if (context.method !== RequestMethod.GET) return;

      const { clientCache } = context.requestConfig || {};
      const shouldCache = !options.predicate || options.predicate();

      if (clientCache && shouldCache) {
        const expiry =
          typeof clientCache === "number"
            ? clientCache
            : options.defaultExpiry || ClientCaching.DEFAULT_CLIENT_CACHE_EXPIRY;
        await ClientCaching.setClientCachedItem(context.key, context.response, expiry);
      }
    },
    [RequestEvent.BEFORE_SEND]: async (context) => {
      if (context.method !== RequestMethod.GET) return;

      const { clientCache } = context.requestConfig || {};
      const shouldCache = !options.predicate || options.predicate();

      if (clientCache && shouldCache) {
        if (clientCache) {
          const cachedValue = await ClientCaching.getClientCachedItem<Response>(context.key);
          if (cachedValue) {
            context.stats.cached = {
              is: true,
              by: CacheSource.LOCAL,
            };

            context.cacheInfo.source = CacheSource.LOCAL;
            context.cacheInfo.cached = true;

            return {
              type: EventResultType.RESPOND,
              response: cachedValue,
            } as any;
          }
        }
      }

      if (clientCache === false) {
        context.updateQuery({
          _bust: Math.floor(Math.random() * 9000) + 1000,
        });
        context.updateHeaders({
          Pragma: "no-cache, no-store, must-revalidate",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        });
      }
    },
  };
};

export default ClientCacheMiddleware;
