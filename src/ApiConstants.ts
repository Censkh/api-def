import {EnumOf} from "./Utils";

export const RequestMethod = {
  Post: "post",
  Get : "get",
} as const;
export type RequestMethod = EnumOf<typeof RequestMethod>;

export const RequestEvent = {
  BeforeSend        : "beforeSend",
  Success           : "success",
  Error             : "error",
  UnrecoverableError: "unrecoverableError",
} as const;
export type RequestEvent = EnumOf<typeof RequestEvent>;

export const EventResultType = {
  Respond: "respond",
  Retry  : "retry",
} as const;
export type EventResultType = EnumOf<typeof EventResultType>;

export const CacheSource = {
  Api  : "api",
  Local: "local",
} as const;
export type CacheSource = EnumOf<typeof CacheSource>;

export const ResponseType = {
  Json       : "json",
  Text       : "text",
  ArrayBuffer: "arraybuffer",
} as const;
export type ResponseType = EnumOf<typeof ResponseType>;
