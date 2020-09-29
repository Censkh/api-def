/// <reference types="typescript" />
"use strict";

export * from "./lib/Api";
export * from "./lib/ApiTypes";

export {clearCache, setCacheBackend}         from "./lib/cache/Caching";
export {default as LocalStorageCacheBackend} from "./lib/cache/LocalStorageCacheBackend";
export {default as LocaleForageCacheBackend} from "./lib/cache/LocalForageCacheBackend";

export {default as AxiosRequestBackend} from "./lib/backend/AxiosRequestBackend";
export {default as FetchRequestBackend} from "./lib/backend/FetchRequestBackend";

export {default as CacheMiddleware}   from "./lib/middleware/CacheMiddleware";
export {default as LoggingMiddleware} from "./lib/middleware/LoggingMiddleware";
