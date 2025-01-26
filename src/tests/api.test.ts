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
    method: RequestMethod.Get,
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
