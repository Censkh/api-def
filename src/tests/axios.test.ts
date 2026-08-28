import axios from "axios";
import { Api, setRequestBackend } from "../Api";
import AxiosRequestBackend from "../backend/AxiosRequestBackend";
import FetchRequestBackend from "../backend/FetchRequestBackend";
import { nodeOnlyIt } from "./runtime";

const cleanResponse = (response: any) => {
  response.headers = undefined;
  response.__lowercaseHeaders = undefined;
  response.stats = undefined;
  return response;
};

nodeOnlyIt("request backends output", async () => {
  const api = new Api({
    baseUrl: "www.google.com",
    name: "Example API",
    requestBackend: new AxiosRequestBackend(axios),

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

  expect(fetchPage.name).toBe("Get 200");

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

it("keeps Axios clients isolated between backend instances", async () => {
  const createAxios = (client: string) => {
    const axios = ((config: { url: string }) =>
      Promise.resolve({
        data: { client },
        status: 200,
        headers: {
          "content-type": "application/json",
          get: (key: string) => (key.toLowerCase() === "content-type" ? "application/json" : undefined),
        },
        request: { res: { responseUrl: config.url } },
      })) as any;
    axios.CancelToken = class {
      constructor(registerCanceller: (cancel: () => void) => void) {
        registerCanceller(() => {});
      }
    };
    return axios;
  };

  const firstApi = new Api({
    baseUrl: "https://example.com",
    name: "First Axios API",
    requestBackend: new AxiosRequestBackend(createAxios("first")),
  });
  const secondApi = new Api({
    baseUrl: "https://example.com",
    name: "Second Axios API",
    requestBackend: new AxiosRequestBackend(createAxios("second")),
  });

  const firstEndpoint = firstApi.endpoint().build({ id: "first", method: "get", path: "/first" });
  secondApi.endpoint().build({ id: "second", method: "get", path: "/second" });

  await expect(firstEndpoint.submit({})).resolves.toMatchObject({ data: { client: "first" } });
});
