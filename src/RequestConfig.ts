import {
  type BaseRequestConfig,
  type Body,
  COMPUTED_CONFIG_SYMBOL,
  type ComputedRequestConfig,
  type Params,
  type Query,
  type RequestConfig,
  type State,
} from "./ApiTypes";
import { DEFAULT_QUERY_PARSE, DEFAULT_QUERY_STRINGIFY } from "./QueryHandling";
import * as Utils from "./Utils";

const MERGED_CONFIG_KEYS = ["headers"];

export const computeRequestConfig = <
  TParams extends Params | undefined,
  TQuery extends Query | undefined,
  TBody extends Body | undefined,
  TState extends State,
>(
  configs: (RequestConfig<TParams, TQuery, TBody, TState> | BaseRequestConfig | undefined)[],
): ComputedRequestConfig<TParams, TQuery, TBody, TState> => {
  const computedConfig: ComputedRequestConfig<TParams, TQuery, TBody, TState> = Utils.assign(
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

  let queryString: string | undefined;
  let queryObject: TQuery | undefined;

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

  if (!computedConfig.state) {
    computedConfig.state = {} as TState;
  }

  return computedConfig;
};
