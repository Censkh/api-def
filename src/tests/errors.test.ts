import { Api } from "../Api";

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
  expect(error.message.startsWith("A GET request to 'http://localhost:1111/test' failed [misc/unknown-error]:")).toBe(
    true,
  );
  expect(error instanceof Error).toBe(true);
});
