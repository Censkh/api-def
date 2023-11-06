import test from "ava";
import mockApi, { postIdVerifStatus } from "./mock/MockApi";
import { RequestMethod } from "../ApiConstants";
import { Api } from "../Api";
import * as qs from "qs";

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

const queryReturnEndpoint = api.endpoint()
  .queryOf<string>()
  .build({
    name: "Fetch Users",
    id: "fetchUsers",
    method: RequestMethod.Get,
    path: "/users",

    mocking: {
      handler: (req, res) => {
        return res.status(200).send([
          { name: "Test", query: req.query },
        ]);
      },
    },

  });

test("URL is properly constructed", async (t) => {

  const res = await postIdVerifStatus.submit({
    body: {
      forceReset: true,
      validationService: 1,
    },
  });

  t.is((res.data as any).url, "https://example.com/id-verif/verif-status");

});

test("query as string", async (t) => {
  const res = await queryReturnEndpoint.submit({
    query: "test=1&id=3",
  });


  t.deepEqual(res.data, [
    {
      name: "Test",
      query: {
        test: "abc",
        id: "3",
      },
    },
  ]);

});

test("qs", async (t) => {
  let res = await queryReturnEndpoint.submit({
    query: "id[0]=1&id[1]=2",
  });

  t.deepEqual(res.data, [
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

  t.deepEqual(res.data, [
    {
      name: "Test",
      query: {
        test: "abc",
        id: [ "1", "2" ],
      },
    },
  ]);

});

/*test("infer params in typescript", async (t) => {
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
