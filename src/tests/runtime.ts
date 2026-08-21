export const isBrowserTestRuntime = typeof window !== "undefined" && typeof document !== "undefined";

export const nodeOnlyIt = isBrowserTestRuntime ? it.skip : it;
export const nodeOnlyDescribe = isBrowserTestRuntime ? describe.skip : describe;
