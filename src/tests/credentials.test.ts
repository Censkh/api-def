import { Api } from "../Api";
import FetchRequestBackend from "../backend/FetchRequestBackend";

it.each(["omit", "same-origin", "include"] as const)("passes %s credentials to fetch", async (credentials) => {
  let request: Request | undefined;
  const fetch = async (input: RequestInfo | URL): Promise<Response> => {
    request = input as Request;
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  const api = new Api({
    name: "Example API",
    baseUrl: "https://example.com",
    requestBackend: new FetchRequestBackend(fetch as any),
  });

  const endpoint = api.endpoint().build({
    id: "credentials",
    method: "get",
    path: "/credentials",
  });

  await endpoint.submit({ credentials });

  expect(request?.credentials).toBe(credentials);
});
