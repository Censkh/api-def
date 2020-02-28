import {CacheSource, EventResultType, RequestEvent, RequestMethod, RequestMiddleware,} from "../ApiTypes";
import * as Caching from "../Caching";

export interface CacheMiddlewareOptions {
    defaultExpiry?: number;
    predicate?: () => boolean;
}

const CacheMiddleware = (
    options: CacheMiddlewareOptions = {},
): RequestMiddleware => {
    return {
        [RequestEvent.Success]: async (context) => {
            if (context.method !== RequestMethod.Get) return;

            const {cache} = context.computedConfig.options || {};
            const shouldCache = !options.predicate || options.predicate();

            if (cache && shouldCache) {
                const expiry = typeof cache === "number" ? cache : (options.defaultExpiry || Caching.DEFAULT_CACHE_EXPIRY);
                await Caching.setCachedItem(context.key, context.response, expiry);
            }
        },
        [RequestEvent.BeforeSend]: async (context) => {
            if (context.method !== RequestMethod.Get) return;

            const {cache} = context.computedConfig.options || {};
            const shouldCache = !options.predicate || options.predicate();

            if (cache && shouldCache) {
                if (cache) {
                    const cachedValue = await Caching.getCachedItem<Response>(context.key);
                    if (cachedValue) {
                        context.stats.cached = {
                            is: true,
                            by: CacheSource.Local,
                        };

                        context.cacheInfo.source = CacheSource.Local;
                        context.cacheInfo.cached = true;

                        return {
                            type: EventResultType.Respond,
                            response: cachedValue,
                        } as any;
                    }
                }
            }
            if (cache === false) {
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

export default CacheMiddleware;
