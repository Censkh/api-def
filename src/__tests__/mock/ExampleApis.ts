import {Api} from "../..";
import {RequestMethod} from "../../lib/ApiTypes";

const api = new Api({
    baseUrl: "example.com",
    name: "Example API"
});

export const hello = api.endpoint()
    .queryOf<{ id: string }>()
    .build({
        name: "hello",
        defaults: {},
        description: "asdasd",
        id: "hello",
        method: RequestMethod.Get,
        path: "/hello"
    });