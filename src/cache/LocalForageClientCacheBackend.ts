import type { ClientCacheBackend } from "./ClientCacheBackend";

export default class LocalForageClientCacheBackend implements ClientCacheBackend {
  private store: any;

  constructor(localforage: any) {
    this.store = localforage.createInstance({
      name: "requestClientCache",
    });
  }

  async getItem(key: string): Promise<any> {
    return this.store.getItem(key);
  }

  async setItem(key: string, value: any): Promise<void> {
    await this.store.setItem(key, value);
  }

  async removeItem(key: string): Promise<void> {
    await this.store.removeItem(key);
  }

  async clear(): Promise<void> {
    await this.store.clear();
  }
}
