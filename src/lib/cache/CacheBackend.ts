export interface CacheBackend {

  removeItem(key: string): Promise<void>;
  setItem<T>(key: string, value: T): Promise<void>;
  getItem<T>(key: string): Promise<T | null>;
  clear(): Promise<void>;

}
