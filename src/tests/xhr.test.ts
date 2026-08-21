import { Api } from "../Api";
import XHRRequestBackend from "../backend/XHRRequestBackend";
import { RequestErrorCode } from "../RequestError";

type FakeResponse = {
  headers: string;
  response?: any;
  responseText?: string;
  status?: number;
  url?: string;
};

class FakeXMLHttpRequest {
  static instances: FakeXMLHttpRequest[] = [];
  static errorEvent: Event | undefined;
  static response: FakeResponse = { headers: "Content-Type: application/json\r\n", responseText: "{}" };
  static supportsLoadEnd = true;

  method = "";
  url = "";
  sentBody: any;
  responseType = "";
  withCredentials = false;
  status = 0;
  response: any;
  responseText = "";
  responseURL = "";
  readyState = 0;
  onabort: ((event: Event) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  onload: (() => void) | null = null;
  onloadend: (() => void) | null = null;
  onreadystatechange: (() => void) | null = null;
  ontimeout: (() => void) | null = null;
  readonly requestHeaders: Record<string, string> = {};

  constructor() {
    FakeXMLHttpRequest.instances.push(this);
    if (!FakeXMLHttpRequest.supportsLoadEnd) {
      delete (this as { onloadend?: () => void }).onloadend;
    }
  }

  open(method: string, url: string): void {
    this.method = method;
    this.url = url;
  }

  setRequestHeader(key: string, value: string): void {
    this.requestHeaders[key] = value;
  }

  getAllResponseHeaders(): string {
    return FakeXMLHttpRequest.response.headers;
  }

  send(body: any): void {
    this.sentBody = body;
    const response = FakeXMLHttpRequest.response;
    this.status = response.status ?? 200;
    this.response = response.response;
    this.responseText = response.responseText ?? "";
    this.responseURL = response.url ?? this.url;
    this.readyState = 4;
    queueMicrotask(() => {
      const errorEvent = FakeXMLHttpRequest.errorEvent;
      if (errorEvent) {
        this.onerror?.(errorEvent);
      }
      if ("onloadend" in (this as object)) {
        this.onloadend?.();
      } else {
        this.onreadystatechange?.();
      }
    });
  }

  abort(): void {
    this.onabort?.({ type: "abort" } as Event);
  }
}

const replaceGlobal = (key: string, value: unknown): (() => void) => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, key);
  Object.defineProperty(globalThis, key, {
    configurable: true,
    writable: true,
    value,
  });

  return () => {
    if (descriptor) {
      Object.defineProperty(globalThis, key, descriptor);
    } else {
      Reflect.deleteProperty(globalThis, key);
    }
  };
};

beforeEach(() => {
  FakeXMLHttpRequest.instances = [];
  FakeXMLHttpRequest.errorEvent = undefined;
  FakeXMLHttpRequest.response = { headers: "Content-Type: application/json\r\n", responseText: "{}" };
  FakeXMLHttpRequest.supportsLoadEnd = true;
});

it("sends configured XHR requests and converts JSON responses", async () => {
  FakeXMLHttpRequest.response = {
    headers: "Content-Type: application/json\r\nX-Request-Id: request-123\r\n",
    responseText: '{"created":true}',
    status: 201,
  };

  const api = new Api({
    name: "Example API",
    baseUrl: "https://example.com",
    requestBackend: new XHRRequestBackend(FakeXMLHttpRequest as any),
  });
  const endpoint = api.endpoint().bodyOf<{ name: string }>().responseOf<{ created: boolean }>().build({
    id: "create-user",
    method: "post",
    path: "/users",
  });

  const response = await endpoint.submit({
    body: { name: "Ada" },
    browserCache: "no-cache",
    credentials: "include",
    headers: { "X-Trace": "trace-123" },
  });
  const xhr = FakeXMLHttpRequest.instances[0]!;

  expect(response).toMatchObject({
    data: { created: true },
    method: "post",
    status: 201,
    url: "https://example.com/users",
  });
  expect(response.headers.get("x-request-id")).toBe("request-123");
  expect(xhr.method).toBe("POST");
  expect(xhr.url).toBe("https://example.com/users");
  expect(xhr.sentBody).toBe('{"name":"Ada"}');
  expect(xhr.withCredentials).toBe(true);
  expect(xhr.requestHeaders).toEqual({
    "Content-Type": "application/json;charset=utf-8",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    "X-Trace": "trace-123",
  });
});

it("requests array buffer responses through XHR", async () => {
  const data = new ArrayBuffer(4);
  FakeXMLHttpRequest.response = {
    headers: "Content-Type: application/octet-stream\r\n",
    response: data,
  };

  const api = new Api({
    name: "Example API",
    baseUrl: "https://example.com",
    requestBackend: new XHRRequestBackend(FakeXMLHttpRequest as any),
  });
  const endpoint = api.endpoint().responseOf<ArrayBuffer>().build({
    id: "download",
    method: "get",
    path: "/download",
    responseType: "arraybuffer",
  });

  const response = await endpoint.submit({});

  expect(response.data).toBe(data);
  expect(FakeXMLHttpRequest.instances[0]!.responseType).toBe("arraybuffer");
});

it("converts response headers without native Headers", async () => {
  const restoreHeaders = replaceGlobal("Headers", undefined);
  try {
    FakeXMLHttpRequest.response = {
      headers: "Content-Type: application/json\r\nX-Request-Id: request-123\r\n",
      responseText: '{"ok":true}',
    };

    const api = new Api({
      name: "Example API",
      baseUrl: "https://example.com",
      requestBackend: new XHRRequestBackend(FakeXMLHttpRequest as any),
    });
    const endpoint = api.endpoint().responseOf<{ ok: boolean }>().build({
      id: "no-native-headers",
      method: "get",
      path: "/no-native-headers",
    });

    const response = await endpoint.submit({});

    expect(response.data).toEqual({ ok: true });
    expect(response.headers.get("content-type")).toBe("application/json");
    expect(response.headers.get("x-request-id")).toBe("request-123");
  } finally {
    restoreHeaders();
  }
});

it("falls back to ready-state completion in legacy XHR implementations", async () => {
  FakeXMLHttpRequest.supportsLoadEnd = false;
  FakeXMLHttpRequest.response = {
    headers: "Content-Type: application/json\r\n",
    responseText: '{"ok":true}',
  };

  const api = new Api({
    name: "Example API",
    baseUrl: "https://example.com",
    requestBackend: new XHRRequestBackend(FakeXMLHttpRequest as any),
  });
  const endpoint = api.endpoint().responseOf<{ ok: boolean }>().build({
    id: "legacy-xhr",
    method: "get",
    path: "/legacy-xhr",
  });

  await expect(endpoint.submit({})).resolves.toMatchObject({ data: { ok: true } });
});

it("retains XHR network error events", async () => {
  const errorEvent = { type: "error" } as Event;
  FakeXMLHttpRequest.errorEvent = errorEvent;

  const api = new Api({
    name: "Example API",
    baseUrl: "https://example.com",
    requestBackend: new XHRRequestBackend(FakeXMLHttpRequest as any),
  });
  const endpoint = api.endpoint().build({
    id: "network-error",
    method: "get",
    path: "/network-error",
  });

  const error = await endpoint.submit({}).catch((error) => error);

  expect(error).toMatchObject({ code: RequestErrorCode.REQUEST_NETWORK_ERROR });
  expect(error.event).toBe(errorEvent);
  expect(error.cause).toBe(errorEvent);
});
