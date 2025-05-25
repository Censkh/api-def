import type { ClientCacheBackend } from "./ClientCacheBackend";
import LocalStorageClientCacheBackend from "./LocalStorageClientCacheBackend";

let clientCacheBackend: ClientCacheBackend = new LocalStorageClientCacheBackend();

export const setClientCacheBackend = (backend: ClientCacheBackend): void => {
  clientCacheBackend = backend;
};

export const DEFAULT_CLIENT_CACHE_EXPIRY = /* 15 mins */ 60 * 1000 * 15;

export const clearClientCache = (): Promise<void> => {
  return clientCacheBackend.clear();
};

export interface ClientCacheEntry {
  data: any;
  expiry: number | null;
}

export const setClientCachedItem = async <T>(key: string, value: T, expiry?: number): Promise<T> => {
  const entry: ClientCacheEntry = {
    data: value,
    expiry: expiry === undefined || Number.isNaN(expiry) ? null : expiry,
  };
  await clientCacheBackend.setItem(key, entry);
  return value;
};

export const getClientCachedItem = async <T = any>(key: string): Promise<T | undefined> => {
  const entry: ClientCacheEntry | undefined | null = await clientCacheBackend.getItem(key);
  if (!entry) {
    return undefined;
  }
  if (typeof entry.expiry === "number") {
    if (Date.now() >= entry.expiry) {
      await clientCacheBackend.removeItem(key);
      return undefined;
    }
  }
  return entry.data;
};
