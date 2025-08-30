import type { ResponseType } from "./ApiConstants";
import type { AcceptableStatus, CancelledRequestError } from "./ApiTypes";

export interface ResolveUrlOptions {
  path: string;
  baseUrl: string;
}

export const isCancelledError = (error: Error): error is CancelledRequestError => {
  return "isCancelledRequest" in error;
};

export const isNetworkError = (error: Error): boolean => {
  return (
    error.name === "NetworkError" ||
    error.message === "Network Error" ||
    (error as any).constructor?.name === "NetworkError"
  );
};

const DEFAULT_ACCEPTABLE_STATUS = [[200, 299], 304];

export const isAcceptableStatus = (status: number, acceptableStatus?: AcceptableStatus[]): boolean => {
  const acceptable = acceptableStatus ?? DEFAULT_ACCEPTABLE_STATUS;

  for (const cmpStatus of acceptable) {
    if (Array.isArray(cmpStatus)) {
      const [min, max] = cmpStatus;
      if (status >= min && status <= max) {
        return true;
      }
    } else if (!Number.isNaN(cmpStatus)) {
      if (status === cmpStatus) {
        return true;
      }
    }
  }

  return false;
};

const TEXT_CONTENT_TYPES = ["text/plain", "text/html", "text/xml", "application/xml"];
const JSON_CONTENT_TYPES = ["text/json", "application/json"];
const ARRAY_BUFFER_CONTENT_TYPES = ["application/octet-stream"];
const STREAM_CONTENT_TYPES = ["text/event-stream", "application/x-ndjson"];

export const inferResponseType = (contentType: string | null | undefined): ResponseType => {
  const contentTypePart = contentType?.split(";")[0].trim();
  if (contentTypePart) {
    if (TEXT_CONTENT_TYPES.includes(contentTypePart)) {
      return "text";
    }
    if (JSON_CONTENT_TYPES.includes(contentTypePart)) {
      return "json";
    }
    if (ARRAY_BUFFER_CONTENT_TYPES.includes(contentTypePart)) {
      return "arraybuffer";
    }
    if (STREAM_CONTENT_TYPES.includes(contentTypePart)) {
      return "stream";
    }
  }
  return "text";
};

export const resolvePathParams = (path: string, params: Record<string, string> | undefined): string => {
  let computedPath = path.startsWith("/") ? path : `/${path}`;
  if (params) {
    const keys = Object.keys(params);
    for (let i = 0; i < keys.length; i++) {
      const argName = keys[i];
      const argValue = (params as any)[argName];

      computedPath = computedPath.replace(`:${argName}`, argValue).replace(`{${argName}}`, argValue);
    }
  }
  if (computedPath.includes(":") || computedPath.includes("{")) {
    throw new Error(`[api-def] Not all path params have been resolved: '${computedPath}'`);
  }
  return computedPath;
};

export const resolveUrl = (options: ResolveUrlOptions): URL => {
  const { baseUrl, path } = options;
  let result = !baseUrl.endsWith("/") ? `${baseUrl}/` : baseUrl;
  result += path.startsWith("/") ? path.substring(1) : path;

  let origin: string | undefined = undefined;
  if (typeof window !== "undefined") {
    origin = window.origin;
  }

  if (!origin) {
    if (result.indexOf("://") === -1) {
      result = `https://${result}`;
    }
  }

  return new URL(result, origin);
};
