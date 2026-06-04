import { Blob, FormData } from "formdata-node";
import { Api } from "../Api";
import { postConfiguredFormUrlEncoded, postFormUrlEncoded, postMultipartFormData } from "./mock/MockApi";
import { testAllBackends } from "./TestHelpers";

const installFormDataPolyfill = (): void => {
  Object.assign(globalThis, {
    Blob,
    FormData,
  });
};

it("correctly parses body for form url encoded request", async () => {
  const res = await postFormUrlEncoded.submit({
    body: {
      test: 123,
      b: "test",
    },
  });

  expect(res.data).toEqual(["test=123&b=test"]);
});

it("correctly parses body for configured form url encoded request", async () => {
  const res = await postConfiguredFormUrlEncoded.submit({
    body: {
      test: 123,
      b: "test",
    },
  });

  expect(res.data).toEqual({
    body: "test=123&b=test",
    contentType: "application/x-www-form-urlencoded",
  });
});

it("correctly parses body for configured multipart form data request", async () => {
  installFormDataPolyfill();

  const res = await postMultipartFormData.submit({
    body: {
      file: new Blob(["hello"]) as unknown as globalThis.Blob,
      processingOptions: {
        keepAfterProcessing: true,
      },
      bytes: new Uint8Array([1, 2, 3]),
    },
  });

  expect(res.data).toEqual([
    ["file", "File"],
    ["processingOptions.keepAfterProcessing", "true"],
    ["bytes", "File"],
  ]);
});

testAllBackends(
  "passes existing FormData through unchanged without setting Content-Type",
  async ({ backendName, requestBackend, getRequest }) => {
    installFormDataPolyfill();

    const api = new Api({
      baseUrl: "example.com",
      name: "Example API",
      requestBackend,
    });

    const endpoint = api
      .endpoint()
      .bodyOf<FormData>({
        encoding: "multipart/form-data",
      })
      .responseOf<{ ok: boolean }>()
      .build({
        id: `formdata-pass-through-${backendName}`,
        method: "post",
        path: "/formdata-pass-through",
      });

    const body = new FormData();
    body.append("file", new Blob(["hello"]));
    body.append("processingOptions.keepAfterProcessing", "true");

    const res = await endpoint.submit({
      body,
    });

    expect(res.data.ok).toBe(true);

    const request = getRequest();
    if (backendName === "fetch") {
      expect(request.body).toBe(body);
    } else {
      expect(request.data).toBe(body);
    }
    expect(request.headers["Content-Type"]).toBeUndefined();
    expect(request.headers["content-type"]).toBeUndefined();
  },
);

testAllBackends(
  "converts plain objects to FormData for multipart requests",
  async ({ backendName, requestBackend, getRequest }) => {
    installFormDataPolyfill();

    const api = new Api({
      baseUrl: "example.com",
      name: "Example API",
      requestBackend,
    });

    const endpoint = api
      .endpoint()
      .bodyOf<{
        file: globalThis.Blob;
        processingOptions: {
          keepAfterProcessing: boolean;
        };
        bytes: Uint8Array;
      }>({
        encoding: "multipart/form-data",
      })
      .responseOf<{ ok: boolean }>()
      .build({
        id: `multipart-object-${backendName}`,
        method: "post",
        path: "/multipart-object",
      });

    await endpoint.submit({
      body: {
        file: new Blob(["hello"]) as unknown as globalThis.Blob,
        processingOptions: {
          keepAfterProcessing: true,
        },
        bytes: new Uint8Array([1, 2, 3]),
      },
    });

    const request = getRequest();
    const body = (backendName === "fetch" ? request.body : request.data) as FormData;

    expect(body).toBeInstanceOf(FormData);
    expect(
      Array.from(body.entries()).map(([key, value]) => [
        key,
        typeof value === "string" ? value : value.constructor.name,
      ]),
    ).toEqual([
      ["file", "File"],
      ["processingOptions.keepAfterProcessing", "true"],
      ["bytes", "File"],
    ]);
    expect(request.headers["Content-Type"]).toBeUndefined();
    expect(request.headers["content-type"]).toBeUndefined();
  },
);

testAllBackends(
  "serializes multipart arrays with indexed dot keys",
  async ({ backendName, requestBackend, getRequest }) => {
    installFormDataPolyfill();

    const api = new Api({
      baseUrl: "example.com",
      name: "Example API",
      requestBackend,
    });

    const endpoint = api
      .endpoint()
      .bodyOf<{
        uploadedParts: Array<{
          partNumber: number;
          etag: string;
        }>;
        tags: string[];
      }>({
        encoding: "multipart/form-data",
      })
      .responseOf<{ ok: boolean }>()
      .build({
        id: `multipart-array-${backendName}`,
        method: "post",
        path: "/multipart-array",
      });

    await endpoint.submit({
      body: {
        uploadedParts: [
          {
            partNumber: 1,
            etag: "etag-1",
          },
          {
            partNumber: 2,
            etag: "etag-2",
          },
        ],
        tags: ["alpha", "beta"],
      },
    });

    const request = getRequest();
    const body = (backendName === "fetch" ? request.body : request.data) as FormData;

    expect(Array.from(body.entries())).toEqual([
      ["uploadedParts.0.partNumber", "1"],
      ["uploadedParts.0.etag", "etag-1"],
      ["uploadedParts.1.partNumber", "2"],
      ["uploadedParts.1.etag", "etag-2"],
      ["tags.0", "alpha"],
      ["tags.1", "beta"],
    ]);
  },
);

testAllBackends(
  "converts configured form url encoded bodies to URLSearchParams",
  async ({ backendName, requestBackend, getRequest }) => {
    const api = new Api({
      baseUrl: "example.com",
      name: "Example API",
      requestBackend,
    });

    const endpoint = api
      .endpoint()
      .bodyOf<{
        test: number;
        b: string;
      }>({
        encoding: "application/x-www-form-urlencoded",
      })
      .responseOf<{ ok: boolean }>()
      .build({
        id: `form-urlencoded-${backendName}`,
        method: "post",
        path: "/form-urlencoded",
      });

    await endpoint.submit({
      body: {
        test: 123,
        b: "test",
      },
    });

    const request = getRequest();
    const body = backendName === "fetch" ? request.body : request.data;

    expect(body).toBeInstanceOf(URLSearchParams);
    expect(body.toString()).toBe("test=123&b=test");
    expect(request.headers["Content-Type"]).toBe("application/x-www-form-urlencoded");
  },
);

testAllBackends("sends plain object bodies as JSON by default", async ({ backendName, requestBackend, getRequest }) => {
  const api = new Api({
    baseUrl: "example.com",
    name: "Example API",
    requestBackend,
  });

  const endpoint = api
    .endpoint()
    .bodyOf<{
      test: number;
    }>()
    .responseOf<{ ok: boolean }>()
    .build({
      id: `json-object-${backendName}`,
      method: "post",
      path: "/json-object",
    });

  await endpoint.submit({
    body: {
      test: 123,
    },
  });

  const request = getRequest();
  if (backendName === "fetch") {
    expect(request.body).toBe(JSON.stringify({ test: 123 }));
    expect(request.headers["Content-Type"]).toBe("application/json;charset=utf-8");
  } else {
    expect(request.data).toEqual({ test: 123 });
    expect(request.headers["Content-Type"]).toBeUndefined();
  }
});
