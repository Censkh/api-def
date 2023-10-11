import { CacheBackend } from "./CacheBackend";

export default class LocalStorageCacheBackend implements CacheBackend {

  async clear(): Promise<void> {
    localStorage.clear();
  }

  async getItem<T>(key: string): Promise<T | null> {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

}
