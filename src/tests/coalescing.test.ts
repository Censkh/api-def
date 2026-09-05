import { Api } from "../Api";
import RequestCoalescingMiddleware from "../middleware/RequestCoalescingMiddleware";

const waitFor = async (predicate: () => boolean): Promise<void> => {
  for (let attempt = 0; attempt < 20; attempt++) {
    if (predicate()) {
      return;
    }
    await Promise.resolve();
  }
  throw new Error("Timed out waiting for request");
};

it("coalesces identical in-flight GET requests", async () => {
  let requestCount = 0;
  let releaseRequest!: () => void;
  const requestGate = new Promise<void>((resolve) => {
    releaseRequest = resolve;
  });
  const api = new Api({
    baseUrl: "https://example.com",
    name: "Coalescing API",
    middleware: [RequestCoalescingMiddleware()],
    mocking: { enabled: true },
  });
  const endpoint = api.endpoint().build({
    id: "coalesced-get",
    method: "get",
    path: "/users",
    mocking: {
      handler: async (_context, response) => {
        requestCount++;
        await requestGate;
        return response.status(200).send({ requestCount });
      },
    },
  });

  const firstPromise = endpoint.submit({ state: { caller: "first" } });
  const secondPromise = endpoint.submit({ state: { caller: "second" } });
  await waitFor(() => requestCount === 1);
  releaseRequest();

  const [first, second] = await Promise.all([firstPromise, secondPromise]);

  expect(requestCount).toBe(1);
  expect(first).not.toBe(second);
  expect(first.data).toEqual({ requestCount: 1 });
  expect(second.data).toEqual({ requestCount: 1 });
  expect(first.state).toEqual({ caller: "first" });
  expect(second.state).toEqual({ caller: "second" });
  expect(second.stats.coalesced).toBe(true);

  await endpoint.submit({});
  expect(requestCount).toBe(2);
});

it("does not coalesce requests with different headers", async () => {
  let requestCount = 0;
  let releaseRequests!: () => void;
  const requestGate = new Promise<void>((resolve) => {
    releaseRequests = resolve;
  });
  const api = new Api({
    baseUrl: "https://example.com",
    name: "Header coalescing API",
    middleware: [RequestCoalescingMiddleware()],
    mocking: { enabled: true },
  });
  const endpoint = api.endpoint().build({
    id: "header-get",
    method: "get",
    path: "/users",
    middleware: [
      {
        beforeSend: (context) => {
          context.updateHeaders({ Authorization: `Bearer ${context.requestConfig.state.token}` });
        },
      },
    ],
    mocking: {
      handler: async (_context, response) => {
        requestCount++;
        await requestGate;
        return response.status(200).send({ ok: true });
      },
    },
  });

  const firstPromise = endpoint.submit({ state: { token: "first" } });
  const secondPromise = endpoint.submit({ state: { token: "second" } });
  await waitFor(() => requestCount === 2);
  releaseRequests();
  await Promise.all([firstPromise, secondPromise]);

  expect(requestCount).toBe(2);
});

it("shares failures and removes failed requests from the registry", async () => {
  let requestCount = 0;
  let releaseRequest!: () => void;
  const requestGate = new Promise<void>((resolve) => {
    releaseRequest = resolve;
  });
  const api = new Api({
    baseUrl: "https://example.com",
    name: "Failed coalescing API",
    middleware: [RequestCoalescingMiddleware()],
    mocking: { enabled: true },
  });
  const endpoint = api.endpoint().build({
    id: "failed-get",
    method: "get",
    path: "/users",
    mocking: {
      handler: async (_context, response) => {
        requestCount++;
        await requestGate;
        return response.status(503).send({ unavailable: true });
      },
    },
  });

  const firstPromise = endpoint.submit({}).catch((error) => error);
  const secondPromise = endpoint.submit({}).catch((error) => error);
  await waitFor(() => requestCount === 1);
  releaseRequest();

  const [firstError, secondError] = await Promise.all([firstPromise, secondPromise]);
  expect(requestCount).toBe(1);
  expect(firstError.code).toBe("request/invalid-status");
  expect(secondError.code).toBe("request/invalid-status");

  await endpoint.submit({}).catch(() => undefined);
  expect(requestCount).toBe(2);
});

it("does not coalesce excluded request types", async () => {
  let requestCount = 0;
  const api = new Api({
    baseUrl: "https://example.com",
    name: "Excluded coalescing API",
    middleware: [RequestCoalescingMiddleware()],
    mocking: { enabled: true },
  });
  const postEndpoint = api.endpoint().build({
    id: "post",
    method: "post",
    path: "/users",
    mocking: {
      handler: (_context, response) => {
        requestCount++;
        return response.status(200).send({ ok: true });
      },
    },
  });
  const lockedEndpoint = api.endpoint().build({
    id: "locked",
    method: "get",
    path: "/locked",
    mocking: {
      handler: (_context, response) => {
        requestCount++;
        return response.status(200).send({ ok: true });
      },
    },
  });
  const streamEndpoint = api.endpoint().build({
    id: "stream",
    method: "get",
    path: "/stream",
    responseType: "stream",
    mocking: {
      handler: (_context, response) => {
        requestCount++;
        return response.status(200).send([{ id: 1 }]);
      },
    },
  });

  await Promise.all([postEndpoint.submit({}), postEndpoint.submit({})]);
  await Promise.all([lockedEndpoint.submit({ lock: "first" }), lockedEndpoint.submit({ lock: "second" })]);
  await Promise.all([streamEndpoint.submit({}), streamEndpoint.submit({})]);

  expect(requestCount).toBe(6);
});
