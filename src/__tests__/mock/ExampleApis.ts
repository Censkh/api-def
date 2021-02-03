import {Api}           from "../../Api";
import {RequestMethod} from "../../ApiConstants";

const api = new Api({
  baseUrl: "example.com",
  name   : "Example API",
});

export const hello = api.endpoint()
  .queryOf<{ id: string }>()
  .build({
    name       : "hello",
    config   : {},
    description: "asdasd",
    id         : "hello",
    method     : RequestMethod.Get,
    path       : "/hello",
  });
