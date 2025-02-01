import * as fs from "node:fs";
import { bundle, createConfig } from "@redocly/openapi-core";
// @ts-ignore
import chalk from "chalk";
import { camelCase, startCase, upperFirst } from "lodash";
import openapiTS, { astToString, resolveRef } from "openapi-typescript";

export interface OpenApiToSourceCodeOptions {
  openApiPath: string;
  configFileLocation?: string;
}

const createTypeName = (...parts: string[]) => {
  return startCase(
    parts
      .map((string) => {
        return upperFirst(string).trim();
      })
      .join(""),
  ).replace(/\s/g, "");
};

// @ts-ignore
const METHOD_COLORS = {
  get: chalk.green,
  post: chalk.blue,
  put: chalk.yellow,
  delete: chalk.red,
  patch: chalk.magenta,
} satisfies Record<string, any>;

const resolveComponent = (schema: any, object: any) => {
  if (object.$ref) {
    const ref = object.$ref;
    const resolved = resolveRef(schema, ref, { silent: false, visited: [] });
    if (resolved) {
      return resolved;
    }
  }

  return object;
};

export const openApiToSourceCode = async (options: OpenApiToSourceCodeOptions) => {
  const { openApiPath, configFileLocation } = options;
  const inContents = fs.readFileSync(openApiPath, "utf-8");
  const ast = await openapiTS(inContents, {});

  const bundleResults = await bundle({
    ref: openApiPath,
    config: await createConfig({}),
  });

  const schema = bundleResults.bundle.parsed;

  const routes = schema.paths;

  // now generate the api-def API

  const server = schema.servers[0];

  const extraTypes: Record<string, string> = {};

  const source = `import { Api } from "api-def";

${
  configFileLocation
    ? `let hasConfig = false;
try {
  hasConfig = Boolean(require.resolve("${configFileLocation}"));
} catch {}
const config = hasConfig ? require("${configFileLocation}") : {};
`
    : ""
}

const API = new Api({
  name: "${schema.info.title || "Generate Api"}",
  baseUrl: "${server.url}",${
    configFileLocation
      ? `
  ...(config.default ?? config),`
      : ""
  }
});

${Object.entries(routes)
  .flatMap(([path, route]: [string, any]) => {
    return Object.entries(route).map(([method, methodDef]: [string, any]) => {
      const id = methodDef.operationId;

      const responseStatuses = Object.keys(methodDef.responses);
      const successfulResponse = responseStatuses.filter((status) => status.startsWith("2") || status.startsWith("3"));

      let responseType = undefined;

      const responseTypes: string[] = [];
      for (const status of successfulResponse) {
        const response = methodDef.responses[status];
        if (response) {
          const responseDef = resolveComponent(schema, response);

          for (const mediaType in responseDef.content) {
            const schema = responseDef.content[mediaType].schema;

            if (!responseType) {
              responseType = mediaType.split(";")[0];
            }

            if (schema?.$ref) {
              const name = schema.$ref.split("/").pop();
              extraTypes[createTypeName("Response", name)] = name;
              extraTypes[name] = `components["schemas"]["${name}"]`;
              responseTypes.push(createTypeName("Response", name));
            }
          }
        }
      }

      const bodyTypes: string[] = [];
      if (methodDef.requestBody) {
        // find the schema
        const requestBodyDef = resolveComponent(schema, methodDef.requestBody);
        if (requestBodyDef?.content) {
          for (const mediaType in requestBodyDef.content) {
            const schema = requestBodyDef.content[mediaType].schema;
            if (schema?.$ref) {
              const name = schema.$ref.split("/").pop();
              extraTypes[createTypeName("Body", name)] = name;
              extraTypes[name] = `components["schemas"]["${name}"]`;
              bodyTypes.push(createTypeName("Body", name));
            }
          }
        }
      }

      const queryTypes: string[] = [];
      if (methodDef.parameters?.length) {
        const anyQueryParams = methodDef.parameters.some((param: any) => {
          if (param.in === "query") {
            return true;
          }

          if (param.$ref) {
            const ref = param.$ref;

            const paramDef = schema.components.parameters[ref.split("/").pop()];
            return paramDef.in === "query";
          }
          return false;
        });

        if (anyQueryParams) {
          extraTypes[createTypeName("Query", id)] = createTypeName(id);
          extraTypes[createTypeName(id)] = `operations["${id}"]["parameters"]["query"]`;
          queryTypes.push(createTypeName("Query", id));
        }
      }

      const requestHeaderTypes: string[] = [];
      if (methodDef.parameters?.length) {
        const anyHeaderParams = methodDef.parameters.some((param: any) => {
          if (param.in === "header") {
            return true;
          }

          if (param.$ref) {
            const ref = param.$ref;

            const paramDef = schema.components.parameters[ref.split("/").pop()];
            return paramDef.in === "header";
          }
          return false;
        });

        if (anyHeaderParams) {
          extraTypes[createTypeName("Headers", id)] = createTypeName(id);
          extraTypes[createTypeName(id)] = `NonNullable<operations["${id}"]["parameters"]["header"]>`;
          requestHeaderTypes.push(createTypeName("Headers", id));
        }
      }

      const responseHeaderTypes: string[] = [];

      let pathParams: string[] = [];
      if (methodDef.parameters?.length) {
        pathParams = methodDef.parameters.reduce((pathParams: string[], param: any) => {
          if (param.in === "path") {
            pathParams.push(param.name);
          } else if (param.$ref) {
            const ref = param.$ref;

            const paramDef = schema.components.parameters[ref.split("/").pop()];
            if (paramDef.in === "path") {
              pathParams.push(paramDef.name);
            }
          }
          return pathParams;
        }, []);
      }

      /*
        const methodColor = METHOD_COLORS[method] || chalk.gray;
        console.log(`Generating ${methodColor(method.toUpperCase())} '${id}'`);
         */

      const endpointParts = [
        pathParams.length > 0 ? `.paramsOf<${pathParams.map((string) => `"${string}"`).join(" | ")}>()` : "",
        responseTypes.length > 0 ? `.responseOf<${responseTypes.join(" | ")}>()` : "",
        bodyTypes.length > 0 ? `.bodyOf<${bodyTypes.join(" | ")}>()` : "",
        queryTypes.length > 0 ? `.queryOf<${queryTypes.join(" | ")}>()` : "",
        requestHeaderTypes.length > 0 ? `.requestHeadersOf<${requestHeaderTypes.join(" | ")}>()` : "",
        responseHeaderTypes.length > 0 ? `.responseHeadersOf<${responseHeaderTypes.join(" | ")}>()` : "",
      ];

      return `export const ${camelCase(id)} = API.endpoint()
${endpointParts
  .filter(Boolean)
  .map((part) => `  ${part}`)
  .join("\n")}
  .build({
    method: "${method}",
    path: "${path}",
    id: "${id}",
  });`;
    });
  })
  .join("\n\n")}

export default API;`;

  const types = astToString(ast);

  const extraTypesSource = Object.keys(extraTypes)
    .sort()
    .map((key) => `export type ${key} = ${extraTypes[key]};`)
    .join("\n");

  return `// Type Defs\n\n${types}\n${extraTypesSource}\n\n// API Def\n\n${source}`;
};
