import AxiosRequestBackend from "../backend/AxiosRequestBackend";
import FetchRequestBackend from "../backend/FetchRequestBackend";

export type TestBackendName = "fetch" | "axios";

export interface TestAllBackendsOptions {
  backendName: TestBackendName;
  requestBackend: FetchRequestBackend | AxiosRequestBackend;
  getRequest: () => any;
}

export const testAllBackends = (name: string, testFn: (options: TestAllBackendsOptions) => Promise<void>): void => {
  it(`${name} using fetch backend`, async () => {
    let request: any;
    const fetch = async (_url: string, options?: RequestInit) => {
      request = options;
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    };

    await testFn({
      backendName: "fetch",
      requestBackend: new FetchRequestBackend(fetch as any),
      getRequest: () => request,
    });
  });

  it(`${name} using axios backend`, async () => {
    let request: any;
    const axios = ((config: any) => {
      request = config;
      return Promise.resolve({
        data: { ok: true },
        status: 200,
        headers: {
          "content-type": "application/json",
          get: (key: string) => (key.toLowerCase() === "content-type" ? "application/json" : undefined),
        },
        request: {
          res: {
            responseUrl: config.url,
          },
        },
      });
    }) as any;

    axios.CancelToken = class {
      constructor(registerCanceller: (cancel: () => void) => void) {
        registerCanceller(() => {});
      }
    };

    await testFn({
      backendName: "axios",
      requestBackend: new AxiosRequestBackend(axios),
      getRequest: () => request,
    });
  });
};
