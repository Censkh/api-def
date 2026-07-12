You can pass query parameters as either a raw query string or a query object. The default object serializer is intentionally simple and does not URL-encode values; use a custom serializer for nested or encoded parameters.

#### Object

```typescript {2-5,13-16}
const queryByObjectEndpoint = API.endpoint()
  .queryOf<{
    foo: string;
    bar: number;
  }>()
  .build({
    id: "query-by-object",
    method: "get",
    path: "/query-by-object",
  });

queryByObjectEndpoint.submit({
  query: {
    foo: "bar",
    bar: 12,
  },
});
```

#### String

```typescript {2,10}
const queryByStringEndpoint = API.endpoint()
  .queryOf<string>()
  .build({
    id: "query-by-string",
    method: "get",
    path: "/query-by-string",
  });

queryByStringEndpoint.submit({
  query: "foo=bar&bar=12",
});
```

## Custom Query Handling

You can pass a custom query `stringify`/`parse` pair in default, endpoint, or request config:

```typescript
import { Api } from "api-def";

const API = new Api({
  baseUrl: "https://example.com",
  defaultRequestConfig: {
    queryHandling: {
      stringify: (query) => {
      // stringify query object to string
      },
      parse: (query) => {
      // parse query string to object
      },
    },
  },
});
```

Eg. to use the [qs](https://www.npmjs.com/package/qs) library:

```typescript
import * as qs from "qs";

const API = new Api({
  baseUrl: "https://example.com",
  defaultRequestConfig: {
    queryHandling: {
      stringify: qs.stringify,
      parse: qs.parse,
    },
  },
});

const queryByObjectEndpoint = API.endpoint()
  .queryOf<{
    ids: string[];
  }>()
  .build({
    id: "query-by-string",
    method: "get",
    path: "/query-by-string",
  });

queryByObjectEndpoint.submit({
  query: {
    ids: ["foo", "bar"],
  },
});
```
