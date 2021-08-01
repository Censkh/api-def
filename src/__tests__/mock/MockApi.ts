import {Api}           from "../../Api";
import {RequestMethod} from "../../ApiConstants";

const api = new Api({
  baseUrl: "example.com",
  name   : "Example API",

  mocking: {
    enabled: true,
  },
});

export const fetchUsers = api.endpoint()
  .queryOf<{ id: string }>()
  .build({
    name  : "Fetch Users",
    id    : "fetchUsers",
    method: RequestMethod.Get,
    path  : "/users",

    mocking: {
      handler: (req, res) => {
        return res.status(200).send([
          {name: "Test"},
        ]);
      },
    },

  });

export const fetchRequiresToken = api.endpoint()
  .build({
    name  : "Requires Token",
    id    : "fetchRequiresToken",
    method: RequestMethod.Get,
    path  : "/requires-token",

    mocking: {
      handler: (req, res) => {
        if (!req.headers.token) {
          return res.status(400).send({
            code: "auth/invalid-token",
          });
        }

        return res.status(200).send("hi");
      },
    },
  });


export default api;