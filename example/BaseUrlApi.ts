import {Api} from "api-def";

const def = new Api({
  name   : "Base URL Api",
  baseUrl: "/_api/",
});

export const fetchTest = def.endpoint()
  .build({
    id: "fetch_test",
    method: "get",
    path: "/health-check",
  });

export default def;
