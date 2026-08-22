import { Api } from "../Api";
import { RequestErrorCode } from "../RequestError";

it("1. error should include path", async () => {
  const api = new Api({
    name: "Test",
    baseUrl: "http://localhost:1111",
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
