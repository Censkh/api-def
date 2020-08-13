import * as localforage  from "localforage";
import * as flatted from "flatted";

export const DEFAULT_CACHE_EXPIRY = /* 15 mins */ 60 * 1000 * 15;

export const store = localforage.createInstance({
  name: "requestCache",
});

export const clearCache = (): Promise<void> => {
  return store.clear();
};

export interface CacheEntry {
  data: any;
  expiry: number | null;
}

export const setCachedItem = async <T>(key: string, value: T, expiry?: number): Promise<T> => {
  const safeValue = flatted.parse(flatted.stringify(value));

  const entry: CacheEntry = {
    data  : safeValue,
    expiry: expiry === undefined || isNaN(expiry) ? null : expiry,
  };
  await store.setItem(key, entry);
  return value;
};

export const getCachedItem = async <T = any>(key: string): Promise<T | undefined> => {
  const entry: CacheEntry | undefined | null = await store.getItem(key);
  if (!entry) {
    return undefined;
  }
  if (typeof entry.expiry === "number") {
    if (Date.now() >= entry.expiry) {
      await store.removeItem(key);
      return undefined;
    }
  }
  return entry.data;
};
