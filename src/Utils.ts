// polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
const hasOwn = (object: object, key: PropertyKey): boolean => Object.prototype.hasOwnProperty.call(object, key);

export const assign: (typeof Object)["assign"] =
  Object.assign ||
  ((target: any, ...varArgs: any) => {
    if (target === null || target === undefined) {
      throw new TypeError("Cannot convert undefined or null to object");
    }

    const to = Object(target);

    for (let index = 0; index < varArgs.length; index++) {
      const nextSource = varArgs[index];

      if (nextSource !== null && nextSource !== undefined) {
        for (const nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (hasOwn(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  });

export const padNumber = (stringOrNumber: string | number, maxLength: number): string => {
  const string = stringOrNumber.toString();
  return string.length >= maxLength ? string : "0".repeat(maxLength - string.length) + string;
};

export type EnumOf<T extends Record<string, any>> = T[keyof T];

export type Fetch = typeof window.fetch;

export const getGlobal = (): any => {
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  return undefined;
};

export const getGlobalFetch = (): Fetch | undefined => {
  const global = getGlobal();
  if (global && typeof global.fetch === "function") {
    return global.fetch.bind(global);
  }
  return undefined;
};

export const noop = (): void => {};

/**
 * Just used to simulate lag, or loading times.
 * @param value   The value you want to return after the delay
 * @param delayMs The delay in ms
 * @returns The `value` param as a Promise
 */
export const delayThenReturn = <T>(value: T, delayMs: number): Promise<T> => {
  return new Promise((resolve) => {
    if (delayMs > 0) {
      setTimeout(() => {
        resolve(value);
      }, delayMs);
    } else {
      resolve(value);
    }
  });
};

export const randInt = (min: number, max: number): number => {
  const minI = Math.ceil(min);
  const maxI = Math.floor(max);

  return Math.floor(Math.random() * (maxI - minI + 1)) + minI;
};

export const isFormData = (value: any): value is FormData => {
  return typeof FormData !== "undefined" && value instanceof FormData;
};

export const isFormDataLike = (value: any): value is FormData => {
  return value !== null && typeof value === "object" && typeof value.append === "function";
};

const isPlainObject = (value: any): value is Record<string, any> => {
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

const isBlob = (value: any): value is Blob => {
  return typeof Blob !== "undefined" && value instanceof Blob;
};

const isArrayBuffer = (value: any): value is ArrayBuffer => {
  return typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer;
};

const isArrayBufferView = (value: any): value is ArrayBufferView => {
  return typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(value);
};

const toFormDataValue = (value: any): Blob | string => {
  if (isBlob(value)) {
    return value;
  }

  if ((isArrayBuffer(value) || isArrayBufferView(value)) && typeof Blob !== "undefined") {
    return new Blob([value as BlobPart]);
  }

  return String(value);
};

export const toFormData = (body: any): FormData => {
  if (isFormDataLike(body)) {
    return body;
  }

  if (!isPlainObject(body)) {
    throw new Error("[api-def] multipart/form-data body must be a plain object or FormData");
  }

  if (typeof FormData === "undefined") {
    throw new Error("[api-def] multipart/form-data requires a FormData implementation");
  }

  const formData = new FormData();

  const appendValue = (key: string, value: any): void => {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      for (const [index, item] of value.entries()) {
        appendValue(`${key}.${index}`, item);
      }
      return;
    }

    if (isPlainObject(value) && !isBlob(value)) {
      for (const nestedKey of Object.keys(value)) {
        appendValue(`${key}.${nestedKey}`, value[nestedKey]);
      }
      return;
    }

    formData.append(key, toFormDataValue(value));
  };

  for (const key of Object.keys(body)) {
    appendValue(key, body[key]);
  }

  return formData;
};

export const assertFetchCompatibleFormData = (body: FormData): void => {
  if (typeof Request === "undefined") {
    throw new Error("[api-def] multipart/form-data requires a fetch-compatible Request implementation");
  }

  let request: Request;
  try {
    request = new Request("https://api-def.local", {
      method: "POST",
      body: body as any,
    });
  } catch (error) {
    throw Object.assign(
      new Error("[api-def] multipart/form-data requires a fetch-compatible FormData implementation"),
      {
        cause: error,
      },
    );
  }

  const contentType = request.headers.get("content-type");
  if (!contentType?.toLowerCase().startsWith("multipart/form-data")) {
    throw new Error("[api-def] multipart/form-data requires a fetch-compatible FormData implementation");
  }
};
