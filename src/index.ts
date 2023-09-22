/// <reference types="typescript" />
"use strict";

export * from "./Api";
export * from "./ApiTypes";
export * from "./UtilTypes";
export * from "./ApiConstants";

export {isRequestError} from "./RequestError";

export {default as Endpoint, EndpointConfig} from "./Endpoint";

export {clearCache, setCacheBackend}         from "./cache/Caching";
export {default as LocalStorageCacheBackend} from "./cache/LocalStorageCacheBackend";
export {default as LocaleForageCacheBackend} from "./cache/LocalForageCacheBackend";

export {default as AxiosRequestBackend} from "./backend/AxiosRequestBackend";
export {default as FetchRequestBackend} from "./backend/FetchRequestBackend";

export {default as CacheMiddleware}   from "./middleware/CacheMiddleware";
export {default as LoggingMiddleware} from "./middleware/LoggingMiddleware";
