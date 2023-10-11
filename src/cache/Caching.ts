import { CacheBackend } from "./CacheBackend";
import LocalStorageCacheBackend from "./LocalStorageCacheBackend";

let cacheBackend: CacheBackend = new LocalStorageCacheBackend();

export const setCacheBackend = (backend: CacheBackend): void => {
  cacheBackend = backend;
};

export const DEFAULT_CACHE_EXPIRY = /* 15 mins */ 60 * 1000 * 15;

export const clearCache = (): Promise<void> => {
  return cacheBackend.clear();
};

export interface CacheEntry {
  data: any;
  expiry: number | null;
}

export const setCachedItem = async <T>(key: string, value: T, expiry?: number): Promise<T> => {
  const entry: CacheEntry = {
    data: value,
    expiry: expiry === undefined || isNaN(expiry) ? null : expiry,
  };
  await cacheBackend.setItem(key, entry);
  return value;
};

export const getCachedItem = async <T = any>(key: string): Promise<T | undefined> => {
  const entry: CacheEntry | undefined | null = await cacheBackend.getItem(key);
  if (!entry) {
    return undefined;
  }
  if (typeof entry.expiry === "number") {
    if (Date.now() >= entry.expiry) {
      await cacheBackend.removeItem(key);
      return undefined;
    }
  }
  return entry.data;
};
