---
id: mocking
title: Mocking
---

## Usage

### Runtime Mocking

Sometimes you want to be able to easily work on your code, without needing to hit the live service. _""Live Mocking"_ is a very light way specify a default return from your endpoints, to be used during testing/dev.

You just need to set a _Live Mock Function_ on you endpoint:

```typescript title="/endpoint.ts"


export const fetchHealthCheck = api.endpoint()
  .responseOf<{ success: boolean; }>()
  .build({
    id: "fetch_health_check",

    name       : "Health Check",
    description: "Returns success as true",

    path        : "/status/health-check",
    method      : "get",
  })
  .setLiveMockFn( ({body, params, query}) => [200, {success: true}] );
```

As you have access to all of the request parts, your mock function could give a conditional response, or simply a static response as in the example above.

Live Mocks are then enabled/disabled for all endpoint at the API level:

```typescript title="/api.ts"
import {Api} from "api-def";

const api = new Api({
  name        : "My Backend",
  baseUrl     : "http://localhost:5000/v1",
  liveMocking : {enable: true, delayMs: 3000},  // delayMs is optional, and just simulates a delay from the remote service
});

export default api;
```
