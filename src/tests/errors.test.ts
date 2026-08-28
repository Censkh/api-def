import { Api } from "../Api";
import AxiosRequestBackend from "../backend/AxiosRequestBackend";
import FetchRequestBackend from "../backend/FetchRequestBackend";
import { RequestErrorCode } from "../RequestError";

it("1. error should include path", async () => {
  const api = new Api({
    name: "Test",
    baseUrl: "http://localhost:1111",
    requestBackend: new FetchRequestBackend((() => Promise.reject(new TypeError("fetch failed"))) as any),
  });

  const endpoint = api.endpoint().build({
    id: "test",
    method: "get",
    path: "/test",
  });

  let error: any;
  try {
    await endpoint.submit({});
  } catch (e) {
    error = e;
  }

  expect(error).toBeDefined();
  expect(error.message).toContain("A GET request to 'http://localhost:1111/test' failed");
  expect(error.code).toBe(RequestErrorCode.REQUEST_NETWORK_ERROR);
  expect(error instanceof Error).toBe(true);
});

it("classifies Axios socket failures as network errors", async () => {
  const axios = (() => {
    const cause = Object.assign(new Error("connect ECONNREFUSED"), { code: "ECONNREFUSED" });
    return Promise.reject(Object.assign(new Error("Network request failed", { cause }), { isAxiosError: true }));
  }) as any;
  axios.CancelToken = class {
    constructor(registerCanceller: (cancel: () => void) => void) {
      registerCanceller(() => {});
    }
  };

  const api = new Api({
    name: "Test",
    baseUrl: "http://localhost:1111",
    requestBackend: new AxiosRequestBackend(axios),
  });
  const endpoint = api.endpoint().build({
    id: "axios-network-error",
    method: "get",
    path: "/test",
  });

  const error = await endpoint.submit({}).catch((error) => error);

  expect(error.code).toBe(RequestErrorCode.REQUEST_NETWORK_ERROR);
});
