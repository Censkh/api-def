import {CacheBackend} from "./CacheBackend";
import * as flatted   from "flatted";

export default class LocalStorageCacheBackend implements CacheBackend {

  async clear(): Promise<void> {
    localStorage.clear();
  }

  async getItem<T>(key: string): Promise<T | null> {
    const value = localStorage.getItem(key);
    return value ? flatted.parse(value) : null;
  }

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(key, flatted.stringify(value));
  }

}
