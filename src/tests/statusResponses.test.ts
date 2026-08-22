import * as zod from "zod";
import { Api } from "../Api";
import AxiosRequestBackend from "../backend/AxiosRequestBackend";
import FetchRequestBackend from "../backend/FetchRequestBackend";
import { RequestErrorCode } from "../RequestError";
import { schema } from "../Validation";

const api = new Api({
  baseUrl: "https://example.com",
  name: "Status Responses API",
  mocking: {
    enabled: true,
  },
});

const getUser = api
  .endpoint()
  .paramsOf<"id">()
  .queryOf<{ outcome: "found" | "missing" | "invalid" | "unexpected" }>()
  .responsesOf({
    200: {
      schema: zod.object({
        id: zod.string(),
        name: zod.string(),
      }),
    },
    404: {
      schema: zod.object({
        code: zod.literal("not_found"),
      }),
    },
  })
  .build({
    id: "get-user-status-responses",
    method: "get",
    path: "/users/:id",
    defaultRequestConfig: {
      acceptableStatus: [200],
    },
    mocking: {
      handler: (context, res) => {
        switch (context.query.outcome) {
          case "found":
            return res.status(200).send({ id: "user-123", name: "Ada" });
          case "missing":
            return res.status(404).send({ code: "not_found" });
          case "invalid":
            return res.status(404).send({ code: "missing" } as any);
          case "unexpected":
            return res.status(201).send({ id: "user-123", name: "Ada" });
        }
      },
    },
  });

const expectType = <TValue>(_value: TValue): void => {};

it("returns a status-discriminated response union", async () => {
  const response = await getUser.submit({
    params: { id: "user-123" },
    query: { outcome: "found" },
  });

  if (response.status === 200) {
    expectType<{ id: string; name: string }>(response.data);
    expectType<true>(response.ok);
    expect(response.ok).toBe(true);
    expect(response.data).toEqual({ id: "user-123", name: "Ada" });
  } else {
    expectType<{ code: "not_found" }>(response.data);
    throw new Error("Expected a 200 response");
  }
});

it("treats declared non-2xx statuses as normal responses", async () => {
  const response = await getUser.submit({
    params: { id: "missing-user" },
    query: { outcome: "missing" },
  });

  expect(response.status).toBe(404);
  if (response.status === 404) {
    expectType<{ code: "not_found" }>(response.data);
    expectType<false>(response.ok);
    expect(response.ok).toBe(false);
    expect(response.data).toEqual({ code: "not_found" });
  } else {
    throw new Error("Expected a 404 response");
  }
});

it("validates the schema for the received status", async () => {
  const error = await getUser
    .submit({
      params: { id: "missing-user" },
      query: { outcome: "invalid" },
    })
    .catch((error) => error);

  expect(error).toMatchObject({ code: RequestErrorCode.VALIDATION_RESPONSE_VALIDATE_ERROR });
  expect(error.issues?.[0]).toMatchObject({ code: "invalid_value", path: ["code"] });
});

it("rejects statuses that are not declared", async () => {
  const error = await getUser
    .submit({
      params: { id: "user-123" },
      query: { outcome: "unexpected" },
    })
    .catch((error) => error);

  expect(error).toMatchObject({
    code: RequestErrorCode.REQUEST_INVALID_STATUS,
    response: {
      status: 201,
      ok: true,
    },
  });
});

it("supports status responses returned as standard Responses", async () => {
  const createUser = api
    .endpoint()
    .responsesOf({
      201: {
        schema: zod.object({ id: zod.string() }),
      },
      409: {
        schema: zod.object({ code: zod.literal("duplicate") }),
      },
    })
    .build({
      id: "create-user-status-responses",
      method: "post",
      path: "/users",
      mocking: {
        handler: () => Response.json({ code: "duplicate" }, { status: 409 }),
      },
    });

  const response = await createUser.submit({});

  expect(response.status).toBe(409);
  if (response.status === 409) {
    expectType<{ code: "duplicate" }>(response.data);
    expectType<false>(response.ok);
    expect(response.ok).toBe(false);
    expect(response.data).toEqual({ code: "duplicate" });
  } else {
    throw new Error("Expected a 409 response");
  }
});

it("supports status contracts without runtime schemas", async () => {
  const deleteUser = api
    .endpoint()
    .paramsOf<"id">()
    .responsesOf({
      202: schema<{ jobId: string }>(),
      409: schema<{ code: "in_progress" }>(),
    })
    .build({
      id: "delete-user-status-responses",
      method: "delete",
      path: "/users/:id",
      mocking: {
        handler: (_context, res) => res.status(202).send({ jobId: "job-123" }),
      },
    });

  const response = await deleteUser.submit({ params: { id: "user-123" } });

  expect(response.status).toBe(202);
  if (response.status === 202) {
    expectType<{ jobId: string }>(response.data);
    expectType<true>(response.ok);
    expect(response.ok).toBe(true);
    expect(response.data).toEqual({ jobId: "job-123" });
  } else {
    throw new Error("Expected a 202 response");
  }
});

it("accepts declared non-2xx Fetch responses", async () => {
  const api = new Api({
    baseUrl: "https://example.com",
    name: "Fetch status responses API",
    requestBackend: new FetchRequestBackend((async () => Response.json({ code: "duplicate" }, { status: 409 })) as any),
  });
  const endpoint = api
    .endpoint()
    .responsesOf({
      409: { schema: zod.object({ code: zod.literal("duplicate") }) },
    })
    .build({ id: "fetch-status-response", method: "get", path: "/users" });

  const response = await endpoint.submit({});

  expect(response).toMatchObject({ status: 409, ok: false, data: { code: "duplicate" } });
});

it("accepts declared non-2xx Axios responses", async () => {
  let requestConfig: { validateStatus: (status: number) => boolean } | undefined;
  const axios = ((config: typeof requestConfig) => {
    requestConfig = config;
    return Promise.resolve({
      data: { code: "duplicate" },
      status: 409,
      headers: {
        "content-type": "application/json",
        get: (key: string) => (key.toLowerCase() === "content-type" ? "application/json" : undefined),
      },
      request: { res: { responseUrl: "https://example.com/users" } },
    });
  }) as any;
  axios.CancelToken = class {
    constructor(registerCanceller: (cancel: () => void) => void) {
      registerCanceller(() => {});
    }
  };

  const api = new Api({
    baseUrl: "https://example.com",
    name: "Axios status responses API",
    requestBackend: new AxiosRequestBackend(axios),
  });
  const endpoint = api
    .endpoint()
    .responsesOf({
      409: { schema: zod.object({ code: zod.literal("duplicate") }) },
    })
    .build({ id: "axios-status-response", method: "get", path: "/users" });

  const response = await endpoint.submit({});

  expect(requestConfig?.validateStatus(409)).toBe(true);
  expect(response).toMatchObject({ status: 409, ok: false, data: { code: "duplicate" } });
});
