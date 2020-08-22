import {ApiResponse, CancelledRequestError, RequestError} from "./ApiTypes";

export class ResponseBuilder<R> {
  private _data: R | undefined;
  private _status = 200;

  send(data: R): ApiResponse<R> {
    this.data(data);
    return this.build();
  }

  data(data: R): this {
    this._data = data;
    return this;
  }

  status(status: number): this {
    this._status = status;
    return this;
  }

  build(): ApiResponse<R> {
    if (this._data === undefined) {
      throw new Error("Response builder doesn't have a response");
    }

    return {
      headers: {},
      data   : this._data,
      status : this._status,
    };
  }
}

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

export const isRequestError = (error: Error): error is RequestError => {
  return "response" in error;
};

export const parseResponseDataToObject = (response: ApiResponse): void => {
  if (
    TextDecoder &&
    response.data &&
    typeof response.data === "object"
  ) {
    const data = response.data;
    if (data.constructor && data.constructor.name === "ArrayBuffer") {
      try {
        const decodedData = (response.data = new TextDecoder("utf-8").decode(
          data,
        ) as any);
        response.data = JSON.parse(decodedData);
      } catch (e) {
        console.warn("Couldn't parse array buffer content to JSON response", e);
      }
    }
  }
};
