import axios from "axios";
import { Api, setRequestBackend } from "../Api";
import AxiosRequestBackend from "../backend/AxiosRequestBackend";
import FetchRequestBackend from "../backend/FetchRequestBackend";

const cleanResponse = (response: any) => {
  response.headers = undefined;
  response.__lowercaseHeaders = undefined;
  response.stats = undefined;
  return response;
};

it("request backends output", async () => {
  const api = new Api({
    baseUrl: "www.google.com",
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

  const fetchPage = api.endpoint().queryOf<string | undefined>().build({
    name: "Get 200",
    id: "200",
    method: "get",
    path: "/generate_204",
  });

  setRequestBackend(new FetchRequestBackend());

  const fetchResult = await fetchPage.submit({
    query: "test",
  });

  setRequestBackend(new AxiosRequestBackend(axios));

  const axiosResult = await fetchPage.submit({
    query: "test",
  });

  expect(cleanResponse(fetchResult)).toEqual(cleanResponse(axiosResult));
  expect(fetchResult.url).toBe("https://www.google.com/generate_204?test=true&id=abc");
});
