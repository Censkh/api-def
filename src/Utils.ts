// polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
export const assign: typeof Object["assign"] = Object.assign || function (target: any, varArgs: any) {
  if (target === null || target === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const to = Object(target);

  for (let index = 1; index < arguments.length; index++) {
    // eslint-disable-next-line prefer-rest-params
    const nextSource = arguments[index];

    if (nextSource !== null && nextSource !== undefined) {
      for (const nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to;
};

export const padNumber = (stringOrNumber: string | number, maxLength: number): string => {
  const string = stringOrNumber.toString();
  return string.length >= maxLength
    ? string
    : "0".repeat(maxLength - string.length) + string;
};

export type EnumOf<T extends Record<string, any>> = T[keyof T];

export type Fetch = typeof window.fetch;

export const getGlobalFetch = (): Fetch | undefined => {
  if (typeof global !== "undefined" && typeof global.fetch === "function") {
    return global.fetch.bind(global);
  }
  if (typeof window === "undefined") {
    return undefined;
  }
  return window.fetch.bind(window);
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = (): void => {
};

/**
 * Just used to simulate lag, or loading times.
 * @param value   The value you want to return after the delay
 * @param delayMs The delay in ms
 * @returns The `value` param as a Promise
 */
export const delayThenReturn = <T>(value: T, delayMs: number): Promise<T> => {

  return (
    new Promise((resolve) => {
      if (delayMs > 0) {
        setTimeout(() => {
          resolve(value);
        }, delayMs);
      } else {
        resolve(value);
      }
    })
  );
};

export const randInt = (min: number, max: number): number => {

  const minI = Math.ceil(min);
  const maxI = Math.floor(max);

  return (Math.floor(Math.random() * (maxI - minI + 1)) + minI);
};
