import type { QueryStringify } from "./ApiTypes";

export const DEFAULT_QUERY_STRINGIFY: QueryStringify = (query) => {
  const queryStrings = [];
  const queryKeys = Object.keys(query);
  for (let i = 0; i < queryKeys.length; i++) {
    const key = queryKeys[i];
    queryStrings.push(`${key}=${query[key]?.toString() ?? ""}`);
  }
  return queryStrings.join("&");
};

export const DEFAULT_QUERY_PARSE = (queryString: string): Record<string, any> => {
  const query: Record<string, any> = {};
  const queryStrings = queryString.split("&");
  for (let i = 0; i < queryStrings.length; i++) {
    const [key, value] = queryStrings[i].split("=");
    query[key] = !value?.length ? true : value;
  }
  return query;
};
