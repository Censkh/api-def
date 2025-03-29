import type { EnumOf } from "./Utils";

export const RequestMethod = {
  POST: "post",
  GET: "get",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
} as const;
export type RequestMethod = EnumOf<typeof RequestMethod>;

export const RequestEvent = {
  BEFORE_SEND: "beforeSend",
  SUCCESS: "success",
  ERROR: "error",
  UNRECOVERABLE_ERROR: "unrecoverableError",
} as const;
export type RequestEvent = EnumOf<typeof RequestEvent>;

export const EventResultType = {
  RESPOND: "respond",
  RETRY: "retry",
} as const;
export type EventResultType = EnumOf<typeof EventResultType>;

export const CacheSource = {
  API: "api",
  LOCAL: "local",
} as const;
export type CacheSource = EnumOf<typeof CacheSource>;

export const ResponseType = {
  JSON: "json",
  TEXT: "text",
  ARRAY_BUFFER: "arraybuffer",
  STREAM: "stream",
} as const;
export type ResponseType = EnumOf<typeof ResponseType>;
