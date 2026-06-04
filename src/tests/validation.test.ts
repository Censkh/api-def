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
  .queryOf({
    schema: zod.object({
      test: zod.string(),
    }),
  })
  .responseOf({
    schema: zod.object({
      name: zod.string(),
      query: zod.object({
        test: zod.string().refine((v) => !Number.isNaN(Number(v)) && Number(v) < 255, "below 255"),
      }),
    }),
  })
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

it("validation", async () => {
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

it("validates bodyOf and responseOf schemas passed in options objects", async () => {
  const endpoint = api
    .endpoint()
    .bodyOf<{
      name: string;
      nested: {
        count: number;
      };
    }>({
      schema: zod.object({
        name: zod.string(),
        nested: zod.object({
          count: zod.number(),
        }),
      }),
    })
    .responseOf<{ ok: boolean }>({
      schema: zod.object({
        ok: zod.boolean(),
      }),
    })
    .build({
      id: "schema-options-body",
      method: "post",
      path: "/schema-options-body",

      mocking: {
        handler: (_req, res) => {
          return res.status(200).send({ ok: true });
        },
      },
    });

  const res = await endpoint.submit({
    body: {
      name: "test",
      nested: {
        count: 1,
      },
    },
  });

  expect(res.data.ok).toBe(true);
});

it("validates non-nested query schema passed in an options object", async () => {
  const endpoint = api
    .endpoint()
    .queryOf<{ test: string }>({
      schema: zod.object({
        test: zod.string(),
      }),
    })
    .build({
      id: "schema-options-query",
      method: "get",
      path: "/schema-options-query",

      mocking: {
        handler: (req, res) => {
          return res.status(200).send(req.query);
        },
      },
    });

  const res = await endpoint.submit({
    query: {
      test: "ok",
    },
  });

  expect(res.data).toEqual({ test: "ok" });
});

it("warns when schemas are passed directly to builder methods", () => {
  const warn = jest.spyOn(console, "warn").mockImplementation(() => {});

  try {
    api.endpoint().queryOf(zod.object({ test: zod.string() }));
    api.endpoint().bodyOf(zod.object({ test: zod.string() }));
    api.endpoint().responseOf(zod.object({ test: zod.string() }));
    api.endpoint().stateOf(zod.object({ test: zod.string() }));

    expect(warn.mock.calls).toEqual([
      ["[api-def] queryOf(schema) is deprecated. Use queryOf({ schema }) instead."],
      ["[api-def] bodyOf(schema) is deprecated. Use bodyOf({ schema }) instead."],
      ["[api-def] responseOf(schema) is deprecated. Use responseOf({ schema }) instead."],
      ["[api-def] stateOf(schema) is deprecated. Use stateOf({ schema }) instead."],
    ]);
  } finally {
    warn.mockRestore();
  }
});
