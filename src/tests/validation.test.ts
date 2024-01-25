import * as zod from "zod";
import { Api } from "../Api";

const api = new Api({
  baseUrl: "httpstat.us",
  name: "Example API",

  mocking: {
    enabled: true,
  },
});

const queryReturnEndpoint = api
  .endpoint()
  .queryOf(
    zod.object({
      test: zod.string(),
    }),
  )
  .responseOf(
    zod.object({
      name: zod.string(),
      query: zod.object({
        test: zod.string().refine((v) => !Number.isNaN(Number(v)) && Number(v) < 255, "below 255"),
      }),
    }),
  )
  .build({
    name: "Get 200",
    id: "200",
    method: "get",
    path: "/200",

    mocking: {
      handler: (req, res) => {
        return res.status(200).send({ name: "Test", query: req.query });
      },
    },
  });

test("validation", async () => {
  {
    const res = await queryReturnEndpoint.submit({
      query: {
        test: "200",
      },
    });

    expect(res.data.query.test).toBe("200");
  }

  {
    let error: any;
    try {
      await queryReturnEndpoint.submit({
        query: {
          test: {} as any,
        },
      });
    } catch (e) {
      error = e;
    }
    expect(error.code).toBe("validation/query-validate-error");
    expect(error.issues?.[0].code).toBe("invalid_type");
  }

  {
    let error: any;
    try {
      await queryReturnEndpoint.submit({
        query: {
          test: "300",
        },
      });
    } catch (e) {
      error = e;
    }
    expect(error.code).toBe("validation/response-validate-error");
    expect(error.issues?.[0].message).toBe("below 255");
  }
});
