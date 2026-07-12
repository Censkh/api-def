There are two types of caching available in api-def:

1. Client-side caching using the `ClientCacheMiddleware`
2. Browser's fetch cache using the `browserCache` option

## Client-side Caching

Client caching stores successful `GET` responses in the configured client cache backend. Add the middleware once, then set `clientCache` to `true` or to a duration in milliseconds on a request:

```typescript {6} title="/api.ts"
import { Api, ClientCacheMiddleware } from "api-def";

const API = new Api({
  name: "My Backend",
  baseUrl: "http://localhost:5000/v1",
  middleware: [
    ClientCacheMiddleware({ defaultExpiry: 1000 * 60 * 20 }),
  ],
});
```

### Predicate

You can also pass in a predicate function to disable caching upon certain conditions (for example a super user toggle for debugging):

```typescript
const API = new Api({
  name: "My Backend",
  baseUrl: "http://localhost:5000/v1",
  middleware: [
    ClientCacheMiddleware({
      predicate: () => isCacheEnabled(),
    }),
  ],
});
```

## Cache Backend

By default `api-def` uses `localStorage`, so client caching requires a browser-compatible storage implementation. You can specify your own cache backend using `setClientCacheBackend`.

If you use [localforage](https://www.npmjs.com/package/localforage) you can use it as your cache backend for a small performance increase:

```typescript
import localforage from "localforage";
import { setClientCacheBackend, LocalForageClientCacheBackend } from "api-def";

setClientCacheBackend(new LocalForageClientCacheBackend(localforage));
```

## Browser Cache

You can use the browser's built-in cache by setting the `browserCache` option in request config. This works with both the Fetch and Axios backends:

```typescript
const API = new Api({
  name: "My Backend",
  baseUrl: "http://localhost:5000/v1",
  defaultRequestConfig: {
    browserCache: "force-cache", // Use cached response if available
  },
});
```

Available cache modes:
- `"default"` - The browser looks for a matching request in its HTTP cache
- `"no-store"` - The browser fetches the resource from the remote server without first looking in the cache
- `"reload"` - The browser fetches the resource from the remote server without first looking in the cache, but will then update the cache with the downloaded resource
- `"no-cache"` - The browser looks for a matching request in its HTTP cache
- `"force-cache"` - The browser uses a cached version of the resource, regardless of its expiration date
- `"only-if-cached"` - The browser only uses a cached version of the resource

When using the Axios backend, these cache modes are approximated with `Cache-Control` and `Pragma` headers because Axios does not expose the browser Fetch cache directly.
