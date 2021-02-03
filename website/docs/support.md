---
id: support
title: Browser Support
---

## Environments without Fetch

In environments without `fetch` you will need to provide your own request backend:

### Axios Backend

```typescript {4,5} title="/api.ts"
import axios from "axios";
import {setRequestBackend, AxiosRequestBackend, Api} from "api-def";

// set the request backend and pass in your version of axios
setRequestBackend(new AxiosRequestBackend(axios));

const Api = new Api({...});

export default api;
```
