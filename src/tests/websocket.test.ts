import axios from "axios";
import { Api } from "../Api";
import AxiosRequestBackend from "../backend/AxiosRequestBackend";
import FetchRequestBackend from "../backend/FetchRequestBackend";

const testWebSocketBackends = (
  name: string,
  testFn: (options: {
    backendName: "fetch" | "axios";
    createBackend: (
      webSocketConstructor: new (url: string | URL, protocols?: string | string[]) => WebSocket,
    ) => FetchRequestBackend | AxiosRequestBackend;
  }) => Promise<void>,
): void => {
  it(`${name} using fetch backend`, async () => {
    await testFn({
      backendName: "fetch",
      createBackend: (webSocketConstructor) => new FetchRequestBackend(jest.fn() as any, webSocketConstructor),
    });
  });

  it(`${name} using axios backend`, async () => {
    await testFn({
      backendName: "axios",
      createBackend: (webSocketConstructor) => new AxiosRequestBackend(axios, webSocketConstructor),
    });
  });
};

class TestWebSocket {
  readonly close = jest.fn(() => this.emit("close"));
  readonly listeners: Partial<Record<"open" | "error" | "close", Array<(event: Event) => void>>> = {};
  readyState = 0;

  constructor(
    readonly url: string | URL,
    readonly protocols?: string | string[],
  ) {}

  addEventListener(type: "open" | "error" | "close", listener: (event: Event) => void): void {
    const listeners = this.listeners[type] ?? (this.listeners[type] = []);
    listeners.push(listener);
  }

  removeEventListener(type: "open" | "error" | "close", listener: (event: Event) => void): void {
    this.listeners[type] = this.listeners[type]?.filter((candidate) => candidate !== listener);
  }

  emit(type: "open" | "error" | "close"): void {
    if (type === "open") {
      this.readyState = 1;
    }
    for (const listener of this.listeners[type] ?? []) {
      listener(new Event(type));
    }
  }
}

const createTestWebSocketConstructor = () => {
  const sockets: TestWebSocket[] = [];
  const WebSocketConstructor = jest.fn(function (this: unknown, url: string | URL, protocols?: string | string[]) {
    const socket = new TestWebSocket(url, protocols);
    sockets.push(socket);
    return socket as unknown as WebSocket;
  } as any);

  return { WebSocketConstructor, sockets };
};

testWebSocketBackends("returns websocket constructor responses", async ({ createBackend }) => {
  const webSocket = { close: jest.fn(), readyState: 1 } as unknown as WebSocket;
  const WebSocketConstructor = jest.fn(function (this: unknown) {
    return webSocket;
  });

  const api = new Api({
    baseUrl: "https://example.com",
    name: "Example API",
    requestBackend: createBackend(WebSocketConstructor as any),
  });

  const endpoint = api.endpoint().build({
    id: "connect",
    method: "get",
    path: "/connect",
    responseType: "websocket",
  });

  const response = await endpoint.submit({});

  expect(WebSocketConstructor).toHaveBeenCalledWith("wss://example.com/connect", undefined);
  expect(response.status).toBe(101);
  expect(response.data).toBe(webSocket);
  expect(response.url).toBe("wss://example.com/connect");
});

testWebSocketBackends("passes websocket protocols from Sec-WebSocket-Protocol header", async ({ createBackend }) => {
  const webSocket = { close: jest.fn(), readyState: 1 } as unknown as WebSocket;
  const WebSocketConstructor = jest.fn(function (this: unknown) {
    return webSocket;
  });

  const api = new Api({
    baseUrl: "http://example.com",
    name: "Example API",
    requestBackend: createBackend(WebSocketConstructor as any),
  });

  const endpoint = api.endpoint().build({
    id: "connectProtocol",
    method: "get",
    path: "/connect",
    responseType: "websocket",
  });

  await endpoint.submit({
    headers: {
      "Sec-WebSocket-Protocol": "json, cbor",
    },
  });

  expect(WebSocketConstructor).toHaveBeenCalledWith("ws://example.com/connect", ["json", "cbor"]);
});

testWebSocketBackends("waits for websocket open before resolving", async ({ createBackend }) => {
  const { WebSocketConstructor, sockets } = createTestWebSocketConstructor();

  const api = new Api({
    baseUrl: "http://example.com",
    name: "Example API",
    requestBackend: createBackend(WebSocketConstructor as any),
  });

  const endpoint = api.endpoint().build({
    id: "connectWait",
    method: "get",
    path: "/connect",
    responseType: "websocket",
  });

  let resolved = false;
  const responsePromise = endpoint.submit({}).then((response) => {
    resolved = true;
    return response;
  });

  await Promise.resolve();
  expect(resolved).toBe(false);

  sockets[0]!.emit("open");

  const response = await responsePromise;
  expect(resolved).toBe(true);
  expect(response.status).toBe(101);
  expect(response.data).toBe(sockets[0]);
});

testWebSocketBackends("rejects when websocket errors before opening", async ({ createBackend }) => {
  const { WebSocketConstructor, sockets } = createTestWebSocketConstructor();

  const api = new Api({
    baseUrl: "http://example.com",
    name: "Example API",
    requestBackend: createBackend(WebSocketConstructor as any),
  });

  const endpoint = api.endpoint().build({
    id: "connectError",
    method: "get",
    path: "/connect",
    responseType: "websocket",
  });

  const responsePromise = endpoint.submit({});
  await Promise.resolve();
  sockets[0]!.emit("error");

  await expect(responsePromise).rejects.toThrow("WebSocket connection failed before opening");
});

testWebSocketBackends("ignores websocket errors after opening", async ({ createBackend }) => {
  const { WebSocketConstructor, sockets } = createTestWebSocketConstructor();

  const api = new Api({
    baseUrl: "http://example.com",
    name: "Example API",
    requestBackend: createBackend(WebSocketConstructor as any),
  });

  const endpoint = api.endpoint().build({
    id: "connectPostOpenError",
    method: "get",
    path: "/connect",
    responseType: "websocket",
  });

  const responsePromise = endpoint.submit({});
  await Promise.resolve();
  sockets[0]!.emit("open");

  const response = await responsePromise;
  sockets[0]!.emit("error");
  await Promise.resolve();

  expect(response.status).toBe(101);
  expect(response.data).toBe(sockets[0]);
  expect(sockets[0]!.listeners.error).toEqual([]);
});

testWebSocketBackends("ignores websocket close after opening", async ({ createBackend }) => {
  const { WebSocketConstructor, sockets } = createTestWebSocketConstructor();

  const api = new Api({
    baseUrl: "http://example.com",
    name: "Example API",
    requestBackend: createBackend(WebSocketConstructor as any),
  });

  const endpoint = api.endpoint().build({
    id: "connectPostOpenClose",
    method: "get",
    path: "/connect",
    responseType: "websocket",
  });

  const responsePromise = endpoint.submit({});
  await Promise.resolve();
  sockets[0]!.emit("open");

  const response = await responsePromise;
  sockets[0]!.emit("close");
  await Promise.resolve();

  expect(response.status).toBe(101);
  expect(response.data).toBe(sockets[0]);
  expect(sockets[0]!.listeners.close).toEqual([]);
});
