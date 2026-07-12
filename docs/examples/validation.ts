import { z } from "zod";
import { Api } from "../../src";

const api = new Api({
  name: "My Backend",
  baseUrl: "https://api.example.com/v1",
});

export const fetchValidatedUser = api
  .endpoint()
  .queryOf({
    schema: z.object({ includeProfile: z.boolean() }),
  })
  .responseOf({
    schema: z.object({ id: z.string(), name: z.string() }),
  })
  .build({
    id: "fetch_validated_user",
    path: "/users/me",
    method: "get",
  });

export const submitForm = api
  .endpoint()
  .bodyOf<{ name: string }>({ encoding: "application/x-www-form-urlencoded" })
  .responseOf<{ accepted: boolean }>()
  .build({
    id: "submit_form",
    path: "/forms",
    method: "post",
  });
