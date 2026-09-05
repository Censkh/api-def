import { createHeaders } from "../Headers";
import type RequestContext from "../RequestContext";
import { bindRequestTask } from "../RequestTask";
import type { RequestOperation } from "./RequestBackend";

export type WebSocketConstructor = new (url: string | URL, protocols?: string | string[]) => WebSocket;

export type WebSocketResponse = {
  status: 101;
  headers: Headers;
  url: string;
  webSocket: WebSocket;
};

export const getGlobalWebSocketConstructor = (): WebSocketConstructor | undefined => {
  return typeof WebSocket !== "undefined" ? WebSocket : undefined;
};

export const makeWebSocketRequest = (
  context: RequestContext,
  webSocketConstructor: WebSocketConstructor | undefined,
): RequestOperation<WebSocketResponse> => {
  if (!webSocketConstructor) {
    throw new Error("[api-def] No WebSocket constructor was provided");
  }

  const url = context.requestUrl;
  if (url.protocol === "http:") {
    url.protocol = "ws:";
  } else if (url.protocol === "https:") {
    url.protocol = "wss:";
  }

  const protocolHeader = context.requestConfig.headers?.["Sec-WebSocket-Protocol"];
  const protocols =
    typeof protocolHeader === "string"
      ? protocolHeader.split(",").map((protocol) => protocol.trim())
      : typeof protocolHeader === "number" || typeof protocolHeader === "boolean"
        ? String(protocolHeader)
        : undefined;

  const webSocket = new webSocketConstructor(url.href, protocols);
  let settled = false;
  let handleOpen: (event: Event) => void;
  let handleError: (event: Event) => void;
  let handleClose: (event: Event) => void;

  const removeEventListener = (type: "open" | "error" | "close", listener: (event: Event) => void): void => {
    if ("removeEventListener" in webSocket) {
      webSocket.removeEventListener(type, listener);
    }
  };

  const addEventListener = (type: "open" | "error" | "close", listener: (event: Event) => void): void => {
    if ("addEventListener" in webSocket) {
      webSocket.addEventListener(type, listener);
      return;
    }

    const property = `on${type}` as "onopen" | "onerror" | "onclose";
    (webSocket as any)[property] = listener;
  };

  const cleanup = (): void => {
    removeEventListener("open", handleOpen);
    removeEventListener("error", handleError);
    removeEventListener("close", handleClose);
  };

  const promise = new Promise<WebSocketResponse>((resolve, reject) => {
    handleOpen = bindRequestTask(context, () => {
      settled = true;
      cleanup();
      resolve({
        status: 101,
        headers: createHeaders(),
        url: url.href,
        webSocket,
      });
    });

    handleError = bindRequestTask(context, (event: Event) => {
      settled = true;
      cleanup();
      reject(
        Object.assign(new Error("[api-def] WebSocket connection failed before opening"), {
          cause: event,
        }),
      );
    });

    handleClose = bindRequestTask(context, (event: Event) => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      reject(
        Object.assign(new Error("[api-def] WebSocket connection closed before opening"), {
          cause: event,
        }),
      );
    });

    addEventListener("open", handleOpen);
    addEventListener("error", handleError);
    addEventListener("close", handleClose);

    if (webSocket.readyState === 1) {
      handleOpen(new Event("open"));
    }
  });

  return {
    promise,
    canceler: () => {
      if (!settled) {
        webSocket.close();
      }
    },
  };
};
