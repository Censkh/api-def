import { Api } from "../Api";
import api, { fetchRequiresToken } from "./mock/MockApi";

it("allow for retries in middleware", async () => {
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
    attemptError: (context) => {
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

it("make sure retry only happens a max number of times", async () => {
  let attempts = 0;
  const api = new Api({
    baseUrl: "example.com",
    name: "Retry API",
    mocking: {
      enabled: true,
    },
  });

  const endpoint = api.endpoint().build({
    id: "always404",
    method: "get",
    path: "/always-404",
    config: {
      retry: {
        maxAttempts: 3,
        minDelay: 1,
        maxDelay: 1,
      },
    },
    mocking: {
      handler: (_req, res) => {
        attempts++;
        return res.status(404).send({ error: "not-found" });
      },
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
  expect(attempts).toBe(4);
});
