import { createDefaultRequestBackend } from "../Api";
import AxiosRequestBackend from "../backend/AxiosRequestBackend";
import FetchRequestBackend from "../backend/FetchRequestBackend";
import XHRRequestBackend from "../backend/XHRRequestBackend";

const replaceGlobal = (key: string, value: unknown): (() => void) => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, key);
  Object.defineProperty(globalThis, key, {
    configurable: true,
    writable: true,
    value,
  });

  return () => {
    if (descriptor) {
      Object.defineProperty(globalThis, key, descriptor);
    } else {
      Reflect.deleteProperty(globalThis, key);
    }
  };
};

class FakeXMLHttpRequest {}

it("detects supported request backends", () => {
  expect(FetchRequestBackend.isSupported(fetch as any)).toBe(true);
  expect(XHRRequestBackend.isSupported(FakeXMLHttpRequest as any)).toBe(true);
  expect(AxiosRequestBackend.isSupported(() => Promise.resolve())).toBe(true);
});

it("rejects fetch support when fetch primitives are missing", () => {
  const restoreRequest = replaceGlobal("Request", undefined);
  try {
    expect(FetchRequestBackend.isSupported(fetch as any)).toBe(false);
  } finally {
    restoreRequest();
  }
});

it("supports XHR without native Headers", () => {
  const restoreHeaders = replaceGlobal("Headers", undefined);
  try {
    expect(XHRRequestBackend.isSupported(FakeXMLHttpRequest as any)).toBe(true);
  } finally {
    restoreHeaders();
  }
});

it("uses XHR as the default backend when fetch is unsupported", () => {
  const restoreFetch = replaceGlobal("fetch", undefined);
  const restoreXHR = replaceGlobal("XMLHttpRequest", FakeXMLHttpRequest);
  try {
    expect(createDefaultRequestBackend()).toBeInstanceOf(XHRRequestBackend);
  } finally {
    restoreXHR();
    restoreFetch();
  }
});

it("does not create a default backend when no backend is supported", () => {
  const restoreFetch = replaceGlobal("fetch", undefined);
  const restoreXHR = replaceGlobal("XMLHttpRequest", undefined);
  try {
    expect(createDefaultRequestBackend()).toBeNull();
  } finally {
    restoreXHR();
    restoreFetch();
  }
});
