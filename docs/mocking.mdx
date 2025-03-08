---
id: mocking
title: Mocking
---

## Usage

Sometimes you want to be able to easily work on your code, without needing to hit the live service. _""Live Mocking"_ is a very light way specify a default return from your endpoints, to be used during testing or dev.

You just need to set a mocking config on your endpoint:

```typescript title="/endpoint.ts"
export const fetchHealthCheck = api.endpoint()
  .responseOf<{ success: boolean; }>()
  .build({
    id: "fetch_health_check",

    name       : "Health Check",
    description: "Returns success as true",

    path        : "/status/health-check",
    method      : RequestMethod.Get,

    mocking     : {
      delay   : [200, 2000],
      handler : ({body, params, query}, res) => {
        return(res.status(200).send({
          success: true,
        }));
      },
    },
  });
```

As you have access to all of the request parts, your mock function could give a conditional response, or simply a static response as in the example above.

Mocks are then enabled/disabled for all endpoints at the API level:

```typescript title="/api.ts"
import {Api} from "api-def";

const api = new Api({
  name     : "My Backend",
  baseUrl  : "http://localhost:5000/v1",
  mocking  : {enabled: true},
});

export default api;
```

Calling an endpoint with no mocking configuration when mocking is enabled at the API level will result in an exception being thrown.
