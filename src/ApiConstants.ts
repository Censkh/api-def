export enum RequestMethod {
  Post = "post",
  Get  = "get",
}

export enum RequestEvent {
  BeforeSend         = "beforeSend",
  Success            = "success",
  Error              = "error",
  UnrecoverableError = "unrecoverableError",
}

export enum EventResultType {
  Respond = "respond",
  Retry   = "retry",
}

export enum CacheSource {
  Api   = "api",
  Local = "local",
}

export enum ResponseType {
  Json        = "json",
  Text        = "text",
  ArrayBuffer = "arraybuffer",
}
