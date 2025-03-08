---
id: caching
title: Caching
---

## Usage

To use client-side caching on your requests you can add the cache middleware and then use the config option `cache` to specify how long in ms a response should be kept in browser:

```typescript {6} title="/api.ts"
import {CacheMiddleware} from "api-def";

const api = new Api({
  name   : "My Backend",
  baseUrl: "http://localhost:5000/v1",
  middleware: [new CacheMiddleware({ defaultExpiry: 1000 * 60 * 20 /* 20 mins */ })]
});
```

### Predicate

You can also pass in a predicate function to disable caching upon certain conditions (for example a super user toggle for debugging):

```typescript
    middleware: [
        CacheMiddleware({
            predicate: () => isCacheEnabled()
        })
    ]
```

## Cache Backend

By default `api-def` will use `localStorage` to store the data for the cache. You can specify your own cache backend using `setCacheBackend`.

If you use [localforage](https://www.npmjs.com/package/localforage) you can use it as your cache backend for a small performance increase:

```typescript
import localforage from "localforage";
import {setCacheBackend, LocalForageCacheBackend} from "api-def";

setCacheBackend(new LocalForageCacheBackend(localforage));
```
