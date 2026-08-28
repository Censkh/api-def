import type { ResponseType } from "./ApiConstants";
import type { AcceptableStatus, CancelledRequestError } from "./ApiTypes";

export interface ResolveUrlOptions {
  path: string | URL;
  baseUrl: string;
}

export const isCancelledError = (error: Error): error is CancelledRequestError => {
  return "isCancelledRequest" in error;
};

const NETWORK_ERROR_CODES = new Set([
  "ECONNABORTED",
  "ECONNREFUSED",
  "ECONNRESET",
  "EHOSTUNREACH",
  "ENETUNREACH",
  "EPIPE",
  "ERR_NETWORK",
  "ETIMEDOUT",
]);

export const isNetworkError = (error: Error): boolean => {
  const pending: unknown[] = [error];
  const seen = new Set<unknown>();

  while (pending.length > 0) {
    const current = pending.shift();
    if (!current || typeof current !== "object" || seen.has(current)) {
      continue;
    }
    seen.add(current);

    const candidate = current as {
      cause?: unknown;
      code?: unknown;
      constructor?: { name?: string };
      message?: unknown;
      name?: unknown;
    };
    if (
      candidate.name === "NetworkError" ||
      candidate.message === "Network Error" ||
      candidate.constructor?.name === "NetworkError" ||
      (typeof candidate.code === "string" && NETWORK_ERROR_CODES.has(candidate.code))
    ) {
      return true;
    }

    pending.push(candidate.cause);
  }

  return false;
};

export const isOkStatus = (status: number): boolean => status >= 200 && status < 300;

export const isAbsoluteUrl = (url: string): boolean => {
  return /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(url);
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

export const resolvePathParams = (
  path: string,
  params: Record<string, string> | undefined,
  allowMissing?: boolean,
): string => {
  const computedPath = path.startsWith("/") || isAbsoluteUrl(path) ? path : `/${path}`;

  if (params) {
    const computedPathParts = computedPath.split("/");
    const unusedKeys = new Set(Object.keys(params));

    for (let i = 0; i < computedPathParts.length; i++) {
      const part = computedPathParts[i];

      let paramKey: string | undefined;
      if (part.startsWith(":")) {
        paramKey = part.substring(1);
      } else if (part.startsWith("{") && part.endsWith("}")) {
        paramKey = part.substring(1, part.length - 1);
      }

      if (paramKey) {
        const paramValue = params[paramKey];
        if (!paramValue) {
          if (allowMissing) {
            continue;
          }
          throw new Error(`[api-def] Missing param '${paramKey}'`);
        }
        computedPathParts[i] = paramValue;
        unusedKeys.delete(paramKey);
      }
    }
    if (unusedKeys.size > 0 && !allowMissing) {
      throw new Error(`[api-def] Missing param '${Array.from(unusedKeys)[0]}'`);
    }

    return computedPathParts.join("/");
  }
  return computedPath;
};

export const resolveUrl = (options: ResolveUrlOptions): URL => {
  const { baseUrl, path } = options;
  if (path instanceof URL) {
    return new URL(path.href);
  }

  if (isAbsoluteUrl(path)) {
    return new URL(path);
  }

  let result = !baseUrl.endsWith("/") ? `${baseUrl}/` : baseUrl;
  result += path.startsWith("/") ? path.substring(1) : path;

  let origin: string | undefined;
  if (typeof window !== "undefined") {
    origin = window.origin;
  }

  if (!isAbsoluteUrl(result) && !result.startsWith("/")) {
    result = `https://${result}`;
  }

  return new URL(result, origin);
};
