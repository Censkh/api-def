import axios from "axios";
import { Api } from "../Api";
import AxiosRequestBackend from "../backend/AxiosRequestBackend";
import FetchRequestBackend from "../backend/FetchRequestBackend";

it("returns upgraded websocket responses with fetch backend", async () => {
  const webSocket = { readyState: 1 } as WebSocket;
  let request: Request | undefined;

  const fetch = jest.fn(async (input: RequestInfo | URL) => {
    request = input as Request;

    return {
      ok: false,
      status: 101,
      headers: new Headers(),
      url: request.url,
      webSocket,
    };
  });

  const api = new Api({
    baseUrl: "example.com",
    name: "Example API",
    requestBackend: new FetchRequestBackend(fetch as any),
  });

  const endpoint = api.endpoint().build({
    id: "connect",
    method: "get",
    path: "/connect",
    responseType: "websocket",
  });

  const response = await endpoint.submit({});

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(request).toBeInstanceOf(Request);
  expect(request?.headers.get("connection")).toBe("Upgrade");
  expect(request?.headers.get("upgrade")).toBe("websocket");
  expect(response.status).toBe(101);
  expect(response.data).toBe(webSocket);
});

it("rejects websocket responseType with axios backend", async () => {
  const api = new Api({
    baseUrl: "example.com",
    name: "Example API",
    requestBackend: new AxiosRequestBackend(axios),
  });

  const endpoint = api.endpoint().build({
    id: "connectAxios",
    method: "get",
    path: "/connect",
    responseType: "websocket",
  });

  await expect(endpoint.submit({})).rejects.toThrow("WebSocket responseType is only supported by FetchRequestBackend");
});
