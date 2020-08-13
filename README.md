# [api-def](https://github.com/Censkh/api-def/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Censkh/api-def/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/api-def.svg?style=flat)](https://www.npmjs.com/package/api-def)

Typed APIs with middleware support

``` npm i api-def ```

**Note:** this package is in early development, use with caution

## Getting Started

API def provides a unified way to type your endpoints allowing for compile time checking of query, body, response and even url parameters

### Defining the API

Let's define a simple API which will house a base URL to our backend. I recommend using a file name such as `api.ts` for this file:

```typescript
import {Api} from "api-def";

const apiDef = new Api({
  baseUrl   : "https://example.com/fancy-api/v1",
  name      : "Example API",
});

export default apiDef;
```
