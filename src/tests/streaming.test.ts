import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import axios from "axios";
import { Api } from "../Api";
import type { RequestMethod } from "../ApiConstants";
import AxiosRequestBackend from "../backend/AxiosRequestBackend";
import FetchRequestBackend from "../backend/FetchRequestBackend";

describe("Streaming Response Tests", () => {
  let server: ReturnType<typeof createServer>;
  let baseUrl: string;

  beforeAll(async () => {
    server = createServer((req, res) => {
      if (req.url === "/stream" && req.method === "GET") {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        let count = 0;
        const interval = setInterval(() => {
          if (count >= 3) {
            clearInterval(interval);
            res.end();
            return;
          }
          res.write(`data: ${JSON.stringify({ count: count++ })}\n\n`);
        }, 100);
      } else {
        res.statusCode = 404;
        res.end();
      }
    });

    await new Promise<void>((resolve) => {
      server.listen(0, () => {
        const port = (server.address() as AddressInfo).port;
        baseUrl = `http://localhost:${port}`;
        resolve();
      });
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  const collectStreamData = async (iterator: AsyncIterable<any>) => {
    const results: any[] = [];
    for await (const chunk of iterator) {
      const text = new TextDecoder().decode(chunk);
      const lines = text.split("\n");
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            results.push(JSON.parse(line.slice(6)));
          } catch (e) {
            // Ignore parsing errors
          }
        }
      }
    }
    return results;
  };

  it("should handle streaming responses with Fetch backend", async () => {
    const api = new Api({
      name: "test-api",
      baseUrl,
      requestBackend: new FetchRequestBackend(),
    });

    const endpoint = api.endpoint().build({
      id: "stream",
      method: "get" as RequestMethod,
      path: "/stream",
      responseType: "stream",
    });

    const response = await endpoint.submit({});
    const results = await collectStreamData(response.data);

    expect(results).toHaveLength(3);
    expect(results).toEqual([{ count: 0 }, { count: 1 }, { count: 2 }]);
  });

  it("should handle streaming responses with Axios backend", async () => {
    const api = new Api({
      name: "test-api",
      baseUrl,
      requestBackend: new AxiosRequestBackend(axios),
    });

    const endpoint = api.endpoint().build({
      id: "stream",
      method: "get" as RequestMethod,
      path: "/stream",
      responseType: "stream",
    });

    const response = await endpoint.submit({});
    const results = await collectStreamData(response.data);

    expect(results).toHaveLength(3);
    expect(results).toEqual([{ count: 0 }, { count: 1 }, { count: 2 }]);
  });
});
