import { Api } from "../Api";
import api, { fetchRequiresToken } from "./mock/MockApi";

test("allow for retries in middleware", async () => {
  let thrownError: any;
  try {
    await fetchRequiresToken.submit({});
  } catch (e: any) {
    thrownError = e;
  }

  expect(thrownError.toJSON).toBe(undefined);
  expect(thrownError).toMatchObject({
    response: {
      data: {
        code: "auth/invalid-token",
      },
      status: 400,
    },
  });

  expect(
    await fetchRequiresToken.submit({
      headers: {
        token: "test",
      },
    }),
  ).toMatchObject({
    status: 200,
    data: { hello: true },
  });

  api.middleware.push({
    error: (context) => {
      if (context.error?.response?.data?.code === "auth/invalid-token") {
        context.updateHeaders({
          token: "updated-token",
        });
        return {
          type: "retry",
        };
      }
    },
  });

  expect(await fetchRequiresToken.submit({})).toMatchObject({
    status: 200,
    data: { hello: true },
  });
});

test("make sure retry only happens a max number of times", async () => {
  const api = new Api({
    baseUrl: "httpstat.us",
    name: "Http Status API",
  });

  const endpoint = api.endpoint().build({
    id: "404",
    method: "get",
    path: "/404",
    config: {
      retry: 3,
    },
  });

  let error: any;
  try {
    await endpoint.submit({});
  } catch (e: any) {
    error = e;
  }

  expect(error.response.status).toBe(404);
  expect(error.attempts).toBe(4);
});
