import {
  type BaseRequestConfig,
  type Body,
  COMPUTED_CONFIG_SYMBOL,
  type ComputedRequestConfig,
  type Params,
  type Query,
  type RawHeaders,
  type RequestConfig,
  type State,
} from "./ApiTypes";
import { DEFAULT_QUERY_PARSE, DEFAULT_QUERY_STRINGIFY } from "./QueryHandling";
import * as Utils from "./Utils";

const MERGED_CONFIG_KEYS = ["headers"];

export const processRequestConfigs = <
  TParams extends Params | undefined,
  TQuery extends Query | undefined,
  TBody extends Body | undefined,
  TState extends State,
  TRequestHeaders extends RawHeaders | undefined,
>(
  configs: (RequestConfig<TParams, TQuery, TBody, TState, TRequestHeaders> | BaseRequestConfig | undefined)[],
): ComputedRequestConfig<TParams, TQuery, TBody, TState, TRequestHeaders> => {
  const computedConfig: ComputedRequestConfig<TParams, TQuery, TBody, TState, TRequestHeaders> = Utils.assign(
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

  const query: TQuery = (computedConfig as any).query;

  let queryString = "";
  let queryObject: Query = {};

  if (query) {
    if (typeof query === "string") {
      queryString = query;
      queryObject = computedConfig.queryHandling.parse(query);
    } else {
      queryObject = query;
      queryString = computedConfig.queryHandling.stringify(query);
    }
  }

  Object.defineProperty(computedConfig, "queryString", {
    get() {
      return queryString;
    },

    set(value) {
      queryString = value;
      queryObject = computedConfig.queryHandling.parse(value);
    },
  });

  Object.defineProperty(computedConfig, "queryObject", {
    get() {
      return queryObject;
    },

    set(value: any) {
      queryObject = value;
      queryString = computedConfig.queryHandling.stringify(value);
    },
  });

  if (!computedConfig.state) {
    computedConfig.state = {} as TState;
  }

  return computedConfig;
};
