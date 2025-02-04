import * as fs from "node:fs";
import { bundle, createConfig } from "@redocly/openapi-core";
// @ts-ignore
import chalk from "chalk";
import { camelCase, startCase, upperFirst } from "lodash";
import openapiTS, { astToString, resolveRef, transformSchemaObject } from "openapi-typescript";

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

  for (const key in schema.components.schemas) {
    if (!key.startsWith("inline_response_")) {
      extraTypes[createTypeName(key)] = `components["schemas"]["${key}"]`;
    }
  }

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
      if (!id) {
        return "";
      }

      const responseStatuses = Object.keys(methodDef.responses);
      const successfulResponse = responseStatuses.filter((status) => status.startsWith("2") || status.startsWith("3"));

      let responseType = undefined;

      const responseTypes = new Set<string>();
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
              let typeName: string;
              if (name.startsWith("inline_response_")) {
                typeName = createTypeName(id, "Response");
              } else {
                typeName = createTypeName(name);
              }

              extraTypes[typeName] = `components["schemas"]["${name}"]`;
              responseTypes.add(typeName);
            }
          }
        }
      }

      const bodyTypes = new Set<string>();
      if (methodDef.requestBody) {
        // find the schema
        const requestBodyDef = resolveComponent(schema, methodDef.requestBody);
        if (requestBodyDef?.content) {
          for (const mediaType in requestBodyDef.content) {
            const schema = requestBodyDef.content[mediaType].schema;
            if (schema?.$ref) {
              const name = schema.$ref.split("/").pop();
              extraTypes[createTypeName(name)] = `components["schemas"]["${name}"]`;
              bodyTypes.add(createTypeName(name));
            }
          }
        }
      }

      const queryTypes = new Set<string>();
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
          extraTypes[createTypeName(id)] = `operations["${id}"]["parameters"]["query"]`;
          queryTypes.add(createTypeName(id));
        }
      }

      const requestHeaderTypes = new Set<string>();
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
          extraTypes[createTypeName(id)] = `NonNullable<operations["${id}"]["parameters"]["header"]>`;
          requestHeaderTypes.add(createTypeName(id));
        }
      }

      const responseHeaderTypes = new Set<string>();

      let pathParams = new Set<string>();
      if (methodDef.parameters?.length) {
        pathParams = methodDef.parameters.reduce((pathParams: Set<string>, param: any) => {
          if (param.in === "path") {
            pathParams.add(param.name);
          } else if (param.$ref) {
            const ref = param.$ref;

            const paramDef = schema.components.parameters[ref.split("/").pop()];
            if (paramDef.in === "path") {
              pathParams.add(paramDef.name);
            }
          }
          return pathParams;
        }, pathParams);
      }

      /*
        const methodColor = METHOD_COLORS[method] || chalk.gray;
        console.log(`Generating ${methodColor(method.toUpperCase())} '${id}'`);
         */

      const endpointParts = [
        pathParams.size > 0
          ? `.paramsOf<${Array.from(pathParams)
              .map((string) => `"${string}"`)
              .join(" | ")}>()`
          : "",
        responseTypes.size > 0 ? `.responseOf<${Array.from(responseTypes).join(" | ")}>()` : "",
        bodyTypes.size > 0 ? `.bodyOf<${Array.from(bodyTypes).join(" | ")}>()` : "",
        queryTypes.size > 0 ? `.queryOf<${Array.from(queryTypes).join(" | ")}>()` : "",
        requestHeaderTypes.size > 0 ? `.requestHeadersOf<${Array.from(requestHeaderTypes).join(" | ")}>()` : "",
        responseHeaderTypes.size > 0 ? `.responseHeadersOf<${Array.from(responseHeaderTypes).join(" | ")}>()` : "",
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
