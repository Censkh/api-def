# [api-def](https://github.com/Censkh/api-def/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Censkh/api-def/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/api-def.svg?style=flat)](https://www.npmjs.com/package/api-def) [![build status](https://img.shields.io/github/actions/workflow/status/censkh/api-def/workflow.yml)](https://github.com/Censkh/api-def/actions)

Typed APIs with middleware support

API def provides a unified way to type your endpoints allowing for compile time checking of query, body, response and even url parameters

```bash
npm i api-def
```

- [Documentation](https://censkh.github.io/api-def/)

```typescript
import { Api } from "api-def";

const api = new Api({
  baseUrl: "https://my-api/",
  name: "My API",
});

const fetchData = api
  .endpoint()
  .queryOf<{ includeAwesome: boolean }>()
  .responseOf<{ data: { awesome: boolean } }>()
  .build({
    id: "fetch_data",
    method: "get",
    path: "/data",
  });

// calls GET https://my-api/data?includeAwesome=true
const res = await fetchData.submit({
  query: { includeAwesome: true },
});

console.log(res.data); // { data: { awesome: true } }
```
