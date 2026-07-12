# Node & Browser Support

URL: https://censkh.github.io/api-def/node

Node.js 22 and modern browsers provide `fetch` by default. In environments without `fetch` , provide a compatible request backend:

### Fetch Backend

In older versions of Node.JS you may need to provide your own fetch implementation.

You can provide a fetch implementation to `api-def` by setting the request backend:

/api.ts

```typescript
import { Api, FetchRequestBackend, setRequestBackend } from "api-def";

setRequestBackend(new FetchRequestBackend(fetch));

const API = new Api({
  name: "My Backend",
  baseUrl: "https://api.example.com",
});

export default API;
```

Install and provide a fetch-compatible implementation when targeting an older runtime:

```shell
npm install cross-fetch
```

### Axios Backend

/api.ts

```typescript
import axios from "axios";
import { setRequestBackend, AxiosRequestBackend, Api } from "api-def";

// set the request backend and pass in your version of axios
setRequestBackend(new AxiosRequestBackend(axios));

const API = new Api({
  /* ... */
});

export default API;
```

Install Axios separately when using `AxiosRequestBackend` :

```shell
npm install axios
```
