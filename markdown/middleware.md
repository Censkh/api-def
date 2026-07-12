When we make requests a lot of the time there is some consistent logic between all of our endpoints such as authentication or error handling. This is where middleware come in!

## Defining & Adding Middleware

Middleware are objects whose keys are event names and values are listeners. Listeners may be synchronous or asynchronous.

```typescript title="/auth-middleware.ts"
import { RequestMiddleware } from "api-def";

const getAuthToken = (): Promise<string> => {
  return /*... */;
};

/*
 Add auth header to requests
*/
const AuthMiddleware = (): RequestMiddleware => {
  return {
    // called before a send occurs
    beforeSend: async (context) => {
      const authToken = await getAuthToken();

      if (authToken) {
        context.updateHeaders({
          Authorization: `Bearer ${authToken}`,
        });
      }
    },
  };
};

export default AuthMiddleware;
```

Now that we have our fancy new middleware we can add it to our api:

```typescript {6} title="/api.ts"
import { Api } from "api-def";

const API = new Api({
  name: "My Backend",
  baseUrl: "http://localhost:5000/v1",
  middleware: [AuthMiddleware()],
});

export default API;
```

## Events

| Name                  | Usage
| ---                   | ---
| `beforeSend`          | Called before send.
| `success`             | When the request was a success.
| `error`               | The request failed. May be called multiple times due to retries
| `unrecoverableError`  | The request failed after retries are exhausted or `shouldRetry` returns false. |


## Event Results

Your event listeners can also return special objects that will trigger certain things

### Respond

Applicable in the `beforeSend` event.

Your middleware can respond instead of going to the network, as used by the built-in [client cache middleware](/caching).

```typescript
return {
  type: "respond",
  response: {
    status: 200,
    data: /* ... */,
    headers: {}
  }
};
```

### Retry

Applicable in the `error` event.

Trigger a retry despite the `retry` option. Be careful of causing infinite loops with this!

```typescript
return {
  type: "retry"
};
```

## Endpoint middleware

Pass middleware to an individual endpoint when it should run after API-level middleware:

```typescript
const endpoint = API.endpoint().build({
  id: "fetch_data",
  method: "get",
  path: "/data",
  middleware: [AuthMiddleware()],
});
```

## Request mutation

Middleware can update the request before the backend runs. These changes affect only the current request:

```typescript
const rewriteRequest: RequestMiddleware = {
  beforeSend: (context) => {
    context.updateBaseUrl("https://backup.example.com");
    context.updatePath("/health");
    context.updateMethod("get");
    context.updateBody({ source: "fallback" });
  },
};
```

Use `context.requestConfig` to inspect the merged API, endpoint, and request configuration. `context.state` is not a public property; middleware-only state is available at `context.requestConfig.state`.
