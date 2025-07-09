import { Api } from "../Api";
import { RequestMethod } from "../ApiConstants";

const api = new Api({
  baseUrl: "example.com",
  name: "Example API",

  mocking: {
    enabled: true,
  },

  middleware: [
    {
      beforeSend: async (context) => {
        context.updateQuery({
          test: "abc",
        });
      },
    },
  ],
});

const queryReturnEndpoint = api
  .endpoint()
  .queryOf<string>()
  .build({
    name: "Fetch Users",
    id: "fetchUsers",
    method: RequestMethod.GET,
    path: "/users",

    mocking: {
      handler: async (req, res) => {
        await new Promise((resolve) => setTimeout(resolve, 20));
        return res.status(200).send([{ name: "Test", query: req.query }]);
      },
    },
  });

it("stats", async () => {
  const res = await queryReturnEndpoint.submit({
    query: "test=1&id=3",
  });

  expect(res.status).toBe(200);
  expect(res.stats.durationMs).toBeGreaterThan(30);
});
