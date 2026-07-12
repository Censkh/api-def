import { setClientCacheBackend } from "../cache/ClientCaching";
import ClientCacheMiddleware from "../middleware/ClientCacheMiddleware";

describe("client cache middleware", () => {
  it("treats cache durations as relative to the current time", async () => {
    const entries = new Map<string, unknown>();

    setClientCacheBackend({
      getItem: async (key) => entries.get(key),
      setItem: async (key, value) => {
        entries.set(key, value);
      },
      removeItem: async (key) => {
        entries.delete(key);
      },
      clear: async () => {
        entries.clear();
      },
    });

    const middleware = ClientCacheMiddleware({ defaultExpiry: 60_000 });
    const context = {
      key: "health-check",
      method: "get",
      requestConfig: { clientCache: true },
      response: { status: 200, data: { success: true } },
      stats: { cached: false },
      cacheInfo: { cached: false, source: null },
    } as any;

    if (typeof middleware.success !== "function" || typeof middleware.beforeSend !== "function") {
      throw new Error("Client cache middleware handlers are missing");
    }

    await middleware.success(context);
    const result = await middleware.beforeSend(context);

    expect(result).toEqual({
      type: "respond",
      response: context.response,
    });
  });
});
