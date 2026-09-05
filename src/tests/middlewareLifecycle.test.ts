import { z } from "zod";
import { Api } from "../Api";
import type { RequestMiddleware } from "../ApiTypes";

it("emits attemptError per failed attempt and error once", async () => {
  const events: string[] = [];
  const api = new Api({
    baseUrl: "https://example.com",
    name: "Retry lifecycle API",
    middleware: [
      {
        attemptError: () => {
          events.push("attemptError");
        },
        error: () => {
          events.push("error");
        },
        finally: () => {
          events.push("finally");
        },
      },
    ],
    mocking: { enabled: true },
  });
  const endpoint = api.endpoint().build({
    id: "retry-lifecycle",
    method: "get",
    path: "/retry",
    defaultRequestConfig: { retry: { maxAttempts: 2, minDelay: 1, maxDelay: 1 } },
    mocking: { handler: (_context, response) => response.status(503).send({ unavailable: true }) },
  });

  await endpoint.submit({}).catch(() => undefined);

  expect(events).toEqual(["attemptError", "attemptError", "attemptError", "error", "finally"]);
});

it("emits final error and finally for request validation failures", async () => {
  const events: string[] = [];
  let requestCount = 0;
  const api = new Api({
    baseUrl: "https://example.com",
    name: "Validation lifecycle API",
    middleware: [
      {
        attemptError: () => {
          events.push("attemptError");
        },
        error: () => {
          events.push("error");
        },
        finally: () => {
          events.push("finally");
        },
      },
    ],
    mocking: { enabled: true },
  });
  const endpoint = api
    .endpoint()
    .queryOf({ schema: z.object({ id: z.string() }) })
    .build({
      id: "validation-lifecycle",
      method: "get",
      path: "/validation",
      mocking: {
        handler: (_context, response) => {
          requestCount++;
          return response.status(200).send({ ok: true });
        },
      },
    });

  await endpoint.submit({ query: { id: 123 } as any }).catch(() => undefined);

  expect(requestCount).toBe(0);
  expect(events).toEqual(["error", "finally"]);
});

it("emits final error and finally for response validation failures", async () => {
  const events: string[] = [];
  const api = new Api({
    baseUrl: "https://example.com",
    name: "Response lifecycle API",
    middleware: [
      {
        attemptError: () => {
          events.push("attemptError");
        },
        error: () => {
          events.push("error");
        },
        finally: () => {
          events.push("finally");
        },
      },
    ],
    mocking: { enabled: true },
  });
  const endpoint = api
    .endpoint()
    .responseOf({ schema: z.object({ id: z.string() }) })
    .build({
      id: "response-lifecycle",
      method: "get",
      path: "/response",
      mocking: { handler: (_context, response) => response.status(200).send({ id: 123 } as any) },
    });

  await endpoint.submit({}).catch(() => undefined);

  expect(events).toEqual(["error", "finally"]);
});

it("emits final error and finally when middleware throws", async () => {
  const events: string[] = [];
  const throwingMiddleware: RequestMiddleware = {
    beforeSend: () => {
      throw new Error("middleware failed");
    },
    error: () => {
      events.push("error");
    },
    finally: () => {
      events.push("finally");
    },
  };
  const api = new Api({
    baseUrl: "https://example.com",
    name: "Middleware lifecycle API",
    middleware: [throwingMiddleware],
    mocking: { enabled: true },
  });
  const endpoint = api.endpoint().build({
    id: "middleware-lifecycle",
    method: "get",
    path: "/middleware",
    mocking: { handler: (_context, response) => response.status(200).send({ ok: true }) },
  });

  await endpoint.submit({}).catch(() => undefined);

  expect(events).toEqual(["error", "finally"]);
});

it("emits final error when success middleware throws", async () => {
  const events: string[] = [];
  const api = new Api({
    baseUrl: "https://example.com",
    name: "Success error lifecycle API",
    middleware: [
      {
        success: () => {
          throw new Error("success middleware failed");
        },
        error: () => {
          events.push("error");
        },
        finally: () => {
          events.push("finally");
        },
      },
    ],
    mocking: { enabled: true },
  });
  const endpoint = api.endpoint().build({
    id: "success-error-lifecycle",
    method: "get",
    path: "/success-error",
    mocking: { handler: (_context, response) => response.status(200).send({ ok: true }) },
  });

  const error = await endpoint.submit({}).catch((error) => error);

  expect(error.message).toContain("success middleware failed");
  expect(events).toEqual(["error", "finally"]);
});

it("ignores observer results and runs every error and finally observer", async () => {
  const events: string[] = [];
  const api = new Api({
    baseUrl: "https://example.com",
    name: "Observer lifecycle API",
    middleware: [
      {
        error: (() => {
          events.push("first error");
          return { type: "respond" };
        }) as any,
        finally: (() => {
          events.push("first finally");
          return { type: "respond" };
        }) as any,
      },
      {
        error: () => {
          events.push("second error");
        },
        finally: () => {
          events.push("second finally");
        },
      },
    ],
    mocking: { enabled: true },
  });
  const endpoint = api.endpoint().build({
    id: "observer-lifecycle",
    method: "get",
    path: "/observer",
    mocking: { handler: (_context, response) => response.status(500).send({ failed: true }) },
  });

  const error = await endpoint.submit({}).catch((error) => error);

  expect(error.code).toBe("request/invalid-status");
  expect(events).toEqual(["first error", "second error", "first finally", "second finally"]);
});

it("emits success and finally once for successful requests", async () => {
  const events: string[] = [];
  const api = new Api({
    baseUrl: "https://example.com",
    name: "Success lifecycle API",
    middleware: [
      {
        beforeSend: () => {
          events.push("beforeSend");
        },
        beforeRequest: () => {
          events.push("beforeRequest");
        },
        success: () => {
          events.push("success");
        },
        error: () => {
          events.push("error");
        },
        finally: () => {
          events.push("finally");
        },
      },
    ],
    mocking: { enabled: true },
  });
  const endpoint = api.endpoint().build({
    id: "success-lifecycle",
    method: "get",
    path: "/success",
    mocking: { handler: (_context, response) => response.status(200).send({ ok: true }) },
  });

  await endpoint.submit({});

  expect(events).toEqual(["beforeSend", "beforeRequest", "success", "finally"]);
});
