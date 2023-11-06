import test from "ava";
import * as zod from "zod";
import { Api } from "../Api";

const api = new Api({
  baseUrl: "example.com",
  name: "Example API",

  mocking: {
    enabled: true,
  },
});

const queryReturnEndpoint = api.endpoint()
  .queryOf(zod.object({
    test: zod.string(),
  }))
  .responseOf(zod.object({
    name: zod.string(),
    query: zod.object({
      test: zod.string().refine((v) => !isNaN(Number(v)) && Number(v) < 255, "below 255"),
    }),
  }))
  .build({
    name: "Fetch Users",
    id: "fetchUsers",
    method: "get",
    path: "/users",

    mocking: {
      handler: (req, res) => {
        return res.status(200).send(
          { name: "Test", query: req.query },
        );
      },
    },

  });

test("validation", async (t) => {

  {
    const res = await queryReturnEndpoint.submit({
      query: {
        test: "200",
      },
    });

    t.is(res.data.query.test, "200");
  }

  {
    const error: any =  await t.throwsAsync(async () => await queryReturnEndpoint.submit({
      query: {
        test: {} as any,
      },
    }));
    t.is(error.code, "validation/query-validate-error");
    t.is(error.issues?.[0].code, "invalid_type");
  }

  {
    const error: any =  await t.throwsAsync(async () => await queryReturnEndpoint.submit({
      query: {
        test: "300",
      },
    }));

    t.is(error.code, "validation/response-validate-error");
    t.is(error.issues?.[0].message, "below 255");
  }

});
