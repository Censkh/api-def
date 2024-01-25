import { ResponseType } from "./ApiConstants";
import { AcceptableStatus, CancelledRequestError } from "./ApiTypes";

export const isCancelledError = (error: Error): error is CancelledRequestError => {
  return "isCancelledRequest" in error;
};

export const isNetworkError = (error: Error): boolean => {
  return error.name === "NetworkError" || error.message === "Network Error" || (error as any).constructor?.name === "NetworkError";
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
  }
  return "text";
};
