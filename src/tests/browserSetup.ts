import { vi } from "vitest";

Object.assign(globalThis, {
  jest: vi,
});

if (import.meta.env.VITE_API_DEF_DISABLE_FETCH === "true") {
  Object.defineProperty(globalThis, "fetch", {
    configurable: true,
    writable: true,
    value: undefined,
  });
}
