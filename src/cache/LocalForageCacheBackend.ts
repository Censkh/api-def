import {CacheBackend} from "./CacheBackend";
import * as flatted   from "flatted";

export default class LocalForageCacheBackend implements CacheBackend {

  private readonly store: any;

  constructor(localforage: any) {
    this.store = localforage.createInstance({
      name: "requestCache",
    });
  }

  clear(): Promise<void> {
    return this.store.clear();
  }

  getItem<T>(key: string): Promise<T | null> {
    return this.store.getItem(key);
  }

  removeItem(key: string): Promise<void> {
    return this.store.removeItem(key);
  }

  setItem<T>(key: string, value: T): Promise<void> {
    const safeValue = flatted.parse(flatted.stringify(value));
    return this.store.setItem(key, safeValue);
  }

}
