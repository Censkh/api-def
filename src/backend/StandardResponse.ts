import type { ApiResponse } from "../ApiTypes";
import { inferResponseType } from "../ApiUtils";
import type RequestContext from "../RequestContext";
import { convertToRequestError, RequestErrorCode } from "../RequestError";
import type { ConvertedApiResponse } from "./RequestBackend";

export const isStandardResponse = (value: unknown): value is Response => {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Response).status === "number" &&
    typeof (value as Response).headers?.get === "function" &&
    typeof (value as Response).text === "function"
  );
};

export const convertStandardResponse = async <T>(
  context: RequestContext,
  response: Response,
): Promise<ConvertedApiResponse<T>> => {
  const convertedResponse = {
    method: context.method,
    url: response.url || context.requestUrl.href,
    data: undefined as any,
    status: response.status,
    headers: response.headers,
    state: context.requestConfig.state,
    stats: context.stats,
  } satisfies ApiResponse<T>;
  const responseType = context.responseType ?? inferResponseType(response.headers.get("content-type"));

  let text: string | undefined;
  let data: any;

  try {
    if (responseType === "arraybuffer") {
      data = await response.arrayBuffer();
    } else if (responseType === "json") {
      text = await response.text();
      data = JSON.parse(text);
    } else if (responseType === "stream") {
      data = response.body;
    } else {
      data = await response.text();
    }
  } catch (error) {
    throw convertToRequestError({
      error: Object.assign(
        new Error(`[api-def] Failed to parse response as '${responseType}'${text ? `, got: ${text}` : ""}`),
        {
          cause: error,
        },
      ),
      code: RequestErrorCode.REQUEST_MISMATCH_RESPONSE_TYPE,
      context,
      response: convertedResponse,
    });
  }

  convertedResponse.data = data;

  return convertedResponse;
};
