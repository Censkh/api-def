## Response types

Responses are inferred from their `Content-Type` when possible. Set `responseType` when the server does not provide a useful content type:

```typescript
const download = API.endpoint().build({
  id: "download",
  method: "get",
  path: "/download",
  responseType: "arraybuffer",
});
```

Supported response types are `json`, `text`, `arraybuffer`, `stream`, and `websocket`. Fetch streams expose a `ReadableStream`; Axios streams are exposed through an async iterator wrapper.

For WebSockets, use `responseType: "websocket"` and provide a WebSocket implementation when the runtime does not provide one:

```typescript
const socket = API.endpoint().build({
  id: "socket",
  method: "get",
  path: "/socket",
  responseType: "websocket",
});

const response = await socket.submit({});
response.data.send("hello");
```

Pass a constructor to the backend when the runtime does not expose `WebSocket` globally:

```typescript
import { Api, FetchRequestBackend } from "api-def";

const API = new Api({
  name: "My Backend",
  baseUrl: "https://api.example.com",
  requestBackend: new FetchRequestBackend(fetch, WebSocket),
});
```

## Typed headers and state

Use builder methods to type request and response headers, and `stateOf` to type middleware-only state:

```typescript
const request = API
  .endpoint()
  .requestHeadersOf<{ Authorization: string }>()
  .responseHeadersOf<{ "x-request-id": string }>()
  .stateOf<{ traceId: string }>()
  .build({
    id: "typed-request",
    method: "get",
    path: "/typed-request",
  });

await request.submit({
  headers: { Authorization: "Bearer token" },
  state: { traceId: "trace-123" },
});
```

## URL resolution

Resolve a URL without sending a request. Middleware still runs, so this is useful when middleware rewrites hosts or adds query parameters:

```typescript
const url = await request.resolveUrl({
  params: {},
  query: "preview=true",
});

const path = request.resolvePath({ params: {} });
```

`Api.resolveUrl` provides the same behavior for direct API requests. A request with a string `lock` cancels an earlier in-flight request using the same lock key.

Path parameters may use either `:id` or `{id}` syntax:

```typescript
const user = API.endpoint().paramsOf<"id">().build({
  id: "user",
  method: "get",
  path: "/users/{id}",
});

const path = user.resolvePath({ params: { id: "user-123" } });
```

## Direct API requests

For one-off requests without a named endpoint, use `api.get`, `api.post`, `api.put`, `api.patch`, or `api.delete`:

```typescript
const response = await API.get<{ status: string }>("/status", {});
const absoluteResponse = await API.get(new URL("https://status.example.com/health"), {});
```
