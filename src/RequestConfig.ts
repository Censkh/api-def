import {
  type BaseRequestConfig,
  type Body,
  COMPUTED_CONFIG_SYMBOL,
  type ComputedRequestConfig,
  type Params,
  type Query,
  type RequestConfig,
} from "./ApiTypes";
import { DEFAULT_QUERY_PARSE, DEFAULT_QUERY_STRINGIFY } from "./QueryHandling";
import * as Utils from "./Utils";

const MERGED_CONFIG_KEYS = ["headers"];

export const computeRequestConfig = <
  P extends Params | undefined,
  Q extends Query | undefined,
  B extends Body | undefined,
>(
  configs: (RequestConfig<P, Q, B> | BaseRequestConfig | undefined)[],
): ComputedRequestConfig<P, Q, B> => {
  const computedConfig: ComputedRequestConfig<P, Q, B> = Utils.assign(
    {
      [COMPUTED_CONFIG_SYMBOL]: true,
    },
    ...configs,
  );

  // merge other values
  for (const key of MERGED_CONFIG_KEYS) {
    (computedConfig as any)[key] = Utils.assign(
      {},
      ...configs.reduce((acc, config: any) => {
        if (config?.[key]) {
          acc.push(config[key]);
        }
        return acc;
      }, [] as any[]),
    );
  }

  computedConfig.queryHandling = {
    parse: computedConfig.queryHandling?.parse || DEFAULT_QUERY_PARSE,
    stringify:
      computedConfig.queryHandling?.stringify || (computedConfig as any).queryParser || DEFAULT_QUERY_STRINGIFY,
  };
  (computedConfig as any).queryParser = undefined;

  const query: Q = (computedConfig as any).query;

  let queryString: string | undefined;
  let queryObject: Q | undefined;

  if (query) {
    Object.defineProperty(computedConfig, "queryString", {
      get() {
        if (queryString) {
          return queryString;
        }

        if (typeof query === "string") {
          return (queryString = query);
        }

        return (queryString = computedConfig.queryHandling.stringify(query));
      },
    });

    Object.defineProperty(computedConfig, "queryObject", {
      get() {
        if (queryObject) {
          return queryObject;
        }

        if (typeof query === "string") {
          return (queryObject = computedConfig.queryHandling.parse(query));
        }

        return (queryObject = query);
      },

      set(value: any) {
        queryObject = value;
        queryString = computedConfig.queryHandling.stringify(value);
      },
    });
  }

  return computedConfig;
};
