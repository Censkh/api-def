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

const withColons = api
  .endpoint()
  .paramsOf<"id" | "sub_id">()
  .build({
    name: "Fetch Users",
    id: "fetchUsers",
    method: RequestMethod.GET,
    path: "/users/:id/:sub_id",

    mocking: {
      handler: (req, res) => {
        return res.status(200).send([{ name: "Test", data: req.url }]);
      },
    },
  });

const withColonsInMiddle = api
  .endpoint()
  .paramsOf<"id">()
  .build({
    name: "Account Update",
    id: "accountUpdate",
    method: RequestMethod.POST,
    path: "/users/:id/account:update",

    mocking: {
      handler: (req, res) => {
        return res.status(200).send([{ name: "Test", data: req.url }]);
      },
    },
  });

const withBrackets = api
  .endpoint()
  .paramsOf<"id" | "sub_id">()
  .build({
    name: "Fetch Users",
    id: "fetchUsers",
    method: RequestMethod.GET,
    path: "/users/{id}/{sub_id}",

    mocking: {
      handler: (req, res) => {
        return res.status(200).send([{ name: "Test", data: req.url }]);
      },
    },
  });

it("1. should throw error if missing param", async () => {
  await expect(
    (async () => {
      const res = await withColons.submit({
        params: {
          id: "123",
        },
      });

      return res;
    })(),
  ).rejects.toThrow("[api-def] Missing param 'sub_id'");

  await expect(
    (async () => {
      const res = await withBrackets.submit({
        params: {
          id: "123",
        },
      });

      return res;
    })(),
  ).rejects.toThrow("[api-def] Missing param 'sub_id'");

  // This should not throw an error

  const res = await withColons.submit({
    params: {
      id: "123",
      sub_id: "456",
    },
  });
  expect(res.data).toEqual([{ name: "Test", data: "https://example.com/users/123/456" }]);

  const res2 = await withBrackets.submit({
    params: {
      id: "123",
      sub_id: "456",
    },
  });

  expect(res2.data).toEqual([{ name: "Test", data: "https://example.com/users/123/456" }]);
});

it("2. handle colon midway", async () => {
  const res = await withColonsInMiddle.submit({
    params: {
      id: "account",
    },
  });

  expect(res.data).toBeDefined();
});
