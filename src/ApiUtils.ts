import {AcceptableStatus, ApiResponse, CancelledRequestError} from "./ApiTypes";
import {textDecode}                                           from "./TextDecoding";
import {ResponseType}                                         from "./ApiConstants";

export const isCancelledError = (
  error: Error,
): error is CancelledRequestError => {
  return "isCancelledRequest" in error;
};

export const isNetworkError = (error: Error): boolean => {
  return (
    error.name === "NetworkError" ||
    error.message === "Network Error" ||
    (error as any).constructor?.name === "NetworkError"
  );
};

export const parseResponseDataToObject = (response: ApiResponse): void => {
  if (
    response.data &&
    typeof response.data === "object"
  ) {
    const data = response.data;
    if (data.constructor && data.constructor.name === "ArrayBuffer") {
      try {
        const decodedData = (response.data = textDecode(data) as any);
        response.data = JSON.parse(decodedData);
      } catch (e) {
        // eslint-disable-next-line
        console.warn("[api-def] Couldn't parse array buffer content to JSON response", e);
      }
    }
  }
};

const DEFAULT_ACCEPTABLE_STATUS = [[200, 299], 304];

export const isAcceptableStatus = (status: number, acceptableStatus?: AcceptableStatus[]): boolean => {
  const acceptable = acceptableStatus ?? DEFAULT_ACCEPTABLE_STATUS;

  for (const cmpStatus of acceptable) {
    if (Array.isArray(cmpStatus)) {
      const [min, max] = cmpStatus;
      if (status >= min && status <= max) {
        return (true);
      }
    } else if (!isNaN(cmpStatus)) {
      if (status === cmpStatus) {
        return (true);
      }
    }
  }

  return (false);
};

const JSON_CONTENT_TYPES = ["text/json", "application/json"];

export const inferResponseType = (contentType: string | null | undefined): ResponseType => {
  const contentTypePart = contentType?.split(";")[0].trim();
  if (contentTypePart && JSON_CONTENT_TYPES.includes(contentTypePart)) {
    return "json";
  }
  return "text";
};
