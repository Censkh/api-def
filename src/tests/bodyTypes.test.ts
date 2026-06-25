import { Blob as PolyfillBlob, FormData as PolyfillFormData } from "formdata-node";
import { Api } from "../Api";
import FetchRequestBackend from "../backend/FetchRequestBackend";
import { postConfiguredFormUrlEncoded, postFormUrlEncoded, postMultipartFormData } from "./mock/MockApi";
import { testAllBackends } from "./TestHelpers";

const installFormDataPolyfill = (): void => {
  Object.assign(globalThis, {
    Blob: PolyfillBlob,
    FormData: PolyfillFormData,
  });
};

const restoreFormDataGlobals = (formData: typeof globalThis.FormData, blob: typeof globalThis.Blob): void => {
  Object.assign(globalThis, {
    Blob: blob,
    FormData: formData,
  });
};

const formDataEntries = (formData: FormData): Array<[string, string]> => {
  return Array.from(formData.entries()).map(([key, value]) => [key, typeof value === "string" ? value : "binary"]);
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
  const originalFormData = globalThis.FormData;
  const originalBlob = globalThis.Blob;
  installFormDataPolyfill();

  try {
    const res = await postMultipartFormData.submit({
      body: {
        file: new PolyfillBlob(["hello"]) as unknown as globalThis.Blob,
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
  } finally {
    restoreFormDataGlobals(originalFormData, originalBlob);
  }
});

testAllBackends(
  "passes existing FormData through unchanged without setting Content-Type",
  async ({ backendName, requestBackend, getRequest }) => {
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
      expect(request).toBeInstanceOf(Request);
      expect(formDataEntries(await (request as Request).clone().formData())).toEqual(formDataEntries(body));
      expect((request as Request).headers.get("content-type")).toContain("multipart/form-data");
    } else {
      expect(request.data).toBe(body);
      expect(request.headers["Content-Type"]).toBeUndefined();
      expect(request.headers["content-type"]).toBeUndefined();
    }
  },
);

testAllBackends(
  "converts plain objects to FormData for multipart requests",
  async ({ backendName, requestBackend, getRequest }) => {
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
        file: new Blob(["hello"]),
        processingOptions: {
          keepAfterProcessing: true,
        },
        bytes: new Uint8Array([1, 2, 3]),
      },
    });

    const request = getRequest();
    const body = (backendName === "fetch" ? await (request as Request).clone().formData() : request.data) as FormData;

    expect(body).toBeInstanceOf(FormData);
    expect(
      Array.from(body.entries()).map(([key, value]) => [key, typeof value === "string" ? value : "binary"]),
    ).toEqual([
      ["file", "binary"],
      ["processingOptions.keepAfterProcessing", "true"],
      ["bytes", "binary"],
    ]);
    if (backendName === "fetch") {
      expect((request as Request).headers.get("content-type")).toContain("multipart/form-data");
    } else {
      expect(request.headers["Content-Type"]).toBeUndefined();
      expect(request.headers["content-type"]).toBeUndefined();
    }
  },
);

testAllBackends(
  "serializes multipart arrays with indexed dot keys",
  async ({ backendName, requestBackend, getRequest }) => {
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
    const body = (backendName === "fetch" ? await (request as Request).clone().formData() : request.data) as FormData;

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
    const body = backendName === "fetch" ? await (request as Request).clone().text() : request.data;

    if (backendName === "fetch") {
      expect(body).toBe("test=123&b=test");
      expect((request as Request).headers.get("content-type")).toBe("application/x-www-form-urlencoded");
    } else {
      expect(body).toBeInstanceOf(URLSearchParams);
      expect(body.toString()).toBe("test=123&b=test");
      expect(request.headers["Content-Type"]).toBe("application/x-www-form-urlencoded");
    }
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
    expect(await (request as Request).clone().text()).toBe(JSON.stringify({ test: 123 }));
    expect((request as Request).headers.get("content-type")).toBe("application/json;charset=utf-8");
  } else {
    expect(request.data).toEqual({ test: 123 });
    expect(request.headers["Content-Type"]).toBeUndefined();
  }
});

it("rejects incompatible ambient FormData before calling fetch", async () => {
  const originalFormData = globalThis.FormData;
  const originalBlob = globalThis.Blob;
  const calls: Array<[string, RequestInit]> = [];

  class ReactNativeFormData {
    readonly fields: Array<[string, unknown]> = [];

    append(key: string, value: unknown): void {
      this.fields.push([key, value]);
    }

    toString(): string {
      return "[object FormData]";
    }
  }

  Object.assign(globalThis, {
    Blob: PolyfillBlob,
    FormData: ReactNativeFormData as any,
  });

  const fetch = async (url: string, init?: RequestInit) => {
    const headers = { ...((init?.headers as Record<string, string>) ?? {}) };
    if (init?.body instanceof ReactNativeFormData) {
      headers["Content-Type"] = "text/plain;charset=UTF-8";
    }

    calls.push([url, { ...init, headers }]);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  try {
    const api = new Api({
      baseUrl: "example.com",
      name: "Example API",
      requestBackend: new FetchRequestBackend(fetch as any),
    });

    const uploadPart = api
      .endpoint()
      .bodyOf<{
        totalParts: number;
        uploadedParts: Array<{
          partNumber: number;
          etag: string;
        }>;
        data: globalThis.Blob;
      }>({
        encoding: "multipart/form-data",
      })
      .responseOf<{ ok: boolean }>()
      .build({
        id: "uploadPart",
        method: "post",
        path: "/upload",
      });

    await expect(
      uploadPart.submit({
        body: {
          totalParts: 2,
          uploadedParts: [
            {
              partNumber: 1,
              etag: "etag-1",
            },
          ],
          data: new PolyfillBlob(["hello"], { type: "text/plain" }) as unknown as globalThis.Blob,
        },
      }),
    ).rejects.toThrow("multipart/form-data requires a fetch-compatible FormData implementation");

    expect(calls).toHaveLength(0);
  } finally {
    restoreFormDataGlobals(originalFormData, originalBlob);
  }
});

test("multipart body preserves number fields and blob fields", async () => {
  const fetchMock = jest.fn(async (url: string, init?: RequestInit) => {
    const request = new Request(url, init);
    const form = await request.formData();

    expect(form.get("totalParts")).toBe("2");
    expect(form.get("uploadedParts")).toBeNull();

    const data = form.get("data");
    expect(data).toBeInstanceOf(Blob);
    expect((data as File).name).toBe("blob");
    expect(await (data as Blob).text()).toBe("hello");

    const namedFile = form.get("namedFile");
    expect(namedFile).toBeInstanceOf(Blob);
    expect((namedFile as File).name).toBe("custom.txt");
    expect(await (namedFile as Blob).text()).toBe("named");

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  });

  const api = new Api({
    baseUrl: "http://api.test",
    name: "test",
    requestBackend: new FetchRequestBackend(fetchMock as any),
  });

  const uploadPart = api
    .endpoint()
    .bodyOf<{
      totalParts: number;
      uploadedParts: unknown[];
      data: Blob;
      namedFile: File;
    }>({ encoding: "multipart/form-data" })
    .responseOf<{ ok: boolean }>()
    .build({
      id: "uploadPart",
      method: "post",
      path: "/upload",
      responseType: "json",
    });

  await uploadPart.submit({
    body: {
      totalParts: 2,
      uploadedParts: [],
      data: new Blob(["hello"], { type: "image/jpeg" }),
      namedFile: new File(["named"], "custom.txt", { type: "text/plain" }),
    },
  });
});
