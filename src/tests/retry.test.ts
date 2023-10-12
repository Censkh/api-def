import test from "ava";
import api, { fetchRequiresToken } from "./mock/MockApi";
import { Api } from "../Api";

test("allow for retries in middleware", async (t) => {
  let thrownError;
  try {
    await fetchRequiresToken.submit({});
  } catch (e: any) {
    thrownError = e;
  }

  t.is(thrownError.toJSON, undefined);
  t.like(thrownError, {
    response: {
      data: {
        code: "auth/invalid-token",
      },
      status: 400,
    },
  });


  t.like(await fetchRequiresToken.submit({
    headers: {
      "token": "test",
    },
  }), {
    status: 200,
    data: {hello: true},
  });

  api.middleware.push({
    error: (context) => {
      if (context.error?.response?.data?.code === "auth/invalid-token") {
        context.updateHeaders({
          "token": "updated-token",
        });
        return {
          type: "retry",
        };
      }
    },
  });

  t.like(await fetchRequiresToken.submit({}), {
    status: 200,
    data: {hello: true},
  });
});

test("make sure retry only happens a max number of times", async (t) => {
  const api = new Api({
    baseUrl: "httpstat.us",
    name: "Http Status API",
  });

  const endpoint = api.endpoint()
    .build({
      id: "404",
      method: "get",
      path: "/404",
      config: {
        retry: 3,
      },
    });

  const error: any = await t.throwsAsync(async () => {
    await endpoint.submit({});
  });

  t.is(error.response.status, 404);
  t.is(error.attempts, 4);
});