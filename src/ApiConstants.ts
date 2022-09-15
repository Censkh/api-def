import {EnumOf} from "./Utils";

export const RequestMethod = {
  /** @deprecated use 'POST' */
  Post: "post",
  /** @deprecated use 'GET' */
  Get: "get",

  POST  : "post",
  GET   : "get",
  PUT   : "put",
  DELETE: "delete",
  PATCH : "patch",
} as const;
export type RequestMethod = EnumOf<typeof RequestMethod>;

export const RequestEvent = {
  /** @deprecated use 'BEFORE_SEND' */
  BeforeSend: "beforeSend",
  /** @deprecated use 'SUCCESS' */
  Success: "success",
  /** @deprecated use 'ERROR' */
  Error: "error",
  /** @deprecated use 'UNRECOVERABLE_ERROR' */
  UnrecoverableError: "unrecoverableError",

  BEFORE_SEND        : "beforeSend",
  SUCCESS            : "success",
  ERROR              : "error",
  UNRECOVERABLE_ERROR: "unrecoverableError",
} as const;
export type RequestEvent = EnumOf<typeof RequestEvent>;

export const EventResultType = {
  /** @deprecated use 'RESPOND' */
  Respond: "respond",
  /** @deprecated use 'RETRY' */
  Retry: "retry",

  RESPOND: "respond",
  RETRY  : "retry",
} as const;
export type EventResultType = EnumOf<typeof EventResultType>;

export const CacheSource = {
  /** @deprecated use 'API' */
  Api: "api",
  /** @deprecated use 'LOCAL' */
  Local: "local",

  API  : "api",
  LOCAL: "local",
} as const;
export type CacheSource = EnumOf<typeof CacheSource>;

export const ResponseType = {
  /** @deprecated use 'JSON' */
  Json: "json",
  /** @deprecated use 'TEXT' */
  Text: "text",
  /** @deprecated use 'ARRAY_BUFFER' */
  ArrayBuffer: "arraybuffer",

  JSON        : "json",
  TEXT        : "text",
  ARRAY_BUFFER: "arraybuffer",
} as const;
export type ResponseType = EnumOf<typeof ResponseType>;
