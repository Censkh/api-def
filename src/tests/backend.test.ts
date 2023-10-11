import test from "ava";
import { Api, setRequestBackend } from "../Api";
import FetchRequestBackend from "../backend/FetchRequestBackend";
import AxiosRequestBackend from "../backend/AxiosRequestBackend";
import axios from "axios";

const cleanResponse = (response: any) => {
  delete response.headers;
  delete response.__lowercaseHeaders;
  return response;
};

test("request backends output", async (t) => {

  const api = new Api({
    baseUrl: "example.com",
    name: "Example API",

    middleware: [
      {
        beforeSend: async (context) => {
          context.updateQuery({
            id: "abc",
          });
        },
      },
    ],
  });

  const fetchPage = api.endpoint()
    .queryOf<string | undefined>()
    .build({
      name: "Fetch Page",
      id: "fetchPage",
      method: "get",
      path: "/",
    });

  setRequestBackend(new FetchRequestBackend());

  const fetchResult = await fetchPage.submit({
    query: "test",
  });

  setRequestBackend(new AxiosRequestBackend(axios));

  const axiosResult = await fetchPage.submit({
    query: "test",
  });

  t.deepEqual(cleanResponse(fetchResult), cleanResponse(axiosResult));
  t.is(fetchResult.url, "https://example.com/?test=true&id=abc");

});
