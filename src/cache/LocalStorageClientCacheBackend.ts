import type { ClientCacheBackend } from "./ClientCacheBackend";

export default class LocalStorageClientCacheBackend implements ClientCacheBackend {
  async getItem(key: string): Promise<any> {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  async setItem(key: string, value: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    localStorage.clear();
  }
}
