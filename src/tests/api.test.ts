import * as qs from "qs";
import { Api } from "../Api";
import { RequestMethod } from "../ApiConstants";
import { postIdVerifStatus } from "./mock/MockApi";

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
      handler: (req, res) => {
        return res.status(200).send([{ name: "Test", query: req.query }]);
      },
    },
  });

it("URL is properly constructed", async () => {
  const res = await postIdVerifStatus.submit({
    body: {
      forceReset: true,
      validationService: 1,
    },
  });

  expect((res.data as any).url).toBe("https://example.com/id-verif/verif-status");
});

it("query as string", async () => {
  const res = await queryReturnEndpoint.submit({
    query: "test=1&id=3",
  });

  expect(res.data).toEqual([
    {
      name: "Test",
      query: {
        test: "abc",
        id: "3",
      },
    },
  ]);
});

it("qs", async () => {
  let res = await queryReturnEndpoint.submit({
    query: "id[0]=1&id[1]=2",
  });

  expect(res.data).toEqual([
    {
      name: "Test",
      query: {
        test: "abc",
        "id[0]": "1",
        "id[1]": "2",
      },
    },
  ]);

  res = await queryReturnEndpoint.submit({
    query: "id[0]=1&id[1]=2",
    queryHandling: qs,
  });

  expect(res.data).toEqual([
    {
      name: "Test",
      query: {
        test: "abc",
        id: ["1", "2"],
      },
    },
  ]);
});

it("endpoint-level middleware is executed after API-level middleware", async () => {
  const endpointWithMiddleware = api
    .endpoint()
    .responseOf<{ query: { test: string; endpoint: string } }>()
    .queryOf<{ test?: string; endpoint?: string }>()
    .build({
      name: "Test Middleware",
      id: "testMiddleware",
      method: RequestMethod.GET,
      path: "/test-middleware",

      middleware: [
        {
          beforeSend: async (context) => {
            // This should be added after the API-level 'test=abc'
            context.updateQuery({
              endpoint: "xyz",
            });
          },
        },
      ],

      mocking: {
        handler: (req, res) => {
          const query = req.query || { test: "", endpoint: "" };
          // Ensure we return the exact type expected
          return res.status(200).send({
            query: {
              test: query.test || "",
              endpoint: query.endpoint || "",
            },
          });
        },
      },
    });

  const res = await endpointWithMiddleware.submit({
    query: {}, // Provide empty query object that will be populated by middleware
  });

  expect(res.data.query).toEqual({
    test: "abc", // From API-level middleware
    endpoint: "xyz", // From endpoint-level middleware
  });
});

/*it("infer params in typescript", async (t) => {
  const endpoint = mockApi.endpoint()
    .build({
      method: "get",
      id: "test",
      path: "/test/:id",
    });

  endpoint.submit({
    params: {
      id: "test",
    },
  });
});*/
