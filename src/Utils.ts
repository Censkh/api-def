import { AcceptableStatus } from "./ApiTypes";

// polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
export const assign: typeof Object["assign"] = Object.assign || function(target: any, varArgs: any) {
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

export const getGlobalFetch = ():  Fetch | undefined => {
  if (typeof window === "undefined") {
    return undefined;
  }
  return window.fetch.bind(window);
};

export const isAcceptableStatus = (status: number, acceptableStatus?: AcceptableStatus[]): boolean => {

  const acceptable = acceptableStatus ?? [[200, 299]];

  for (const cmpStatus of acceptable) {
    if (Array.isArray(cmpStatus)) {
      const [min, max] = cmpStatus;
      if (status >= min && status <= max) {
        return(true);
      }
    } else if (!isNaN(cmpStatus)) {
      if (status === cmpStatus) {
        return(true);
      }
    }
  }

  return(false);
};
