import * as fs from "node:fs";
import { bundle, createConfig } from "@redocly/openapi-core";
// @ts-ignore
import chalk from "chalk";
import { program } from "commander";
import { upperFirst } from "lodash";
import openapiTS, { astToString } from "openapi-typescript";

export interface OpenApiToSourceCodeOptions {
  openApiPath: string;
}

const METHOD_COLORS = {
  get: chalk.green,
  post: chalk.blue,
  put: chalk.yellow,
  delete: chalk.red,
  patch: chalk.magenta,
} satisfies Record<string, any>;

export const openApiToSourceCode = async (options: OpenApiToSourceCodeOptions) => {
  const { openApiPath } = options;
  const inContents = fs.readFileSync(openApiPath, "utf-8");
  const ast = await openapiTS(inContents, {});

  const bundleResults = await bundle({
    ref: openApiPath,
    config: await createConfig({}),
  });
  const routes = bundleResults.bundle.parsed.paths;

  // now generate the api-def API

  const server = bundleResults.bundle.parsed.servers[0];

  const extraTypes: Record<string, string> = {};

  const source = `import { Api } from "api-def";

const API = new Api({
  name: "${bundleResults.bundle.parsed.info.title || "Generate Api"}",
  baseUrl: "${server.url}",
  mutable: true,
});

${Object.entries(routes)
  .flatMap(([path, route]: [string, any]) => {
    return Object.entries(route).map(([method, methodDef]: [string, any]) => {
      const id = methodDef.operationId;

      const responseStatuses = Object.keys(methodDef.responses);
      const successfulResponse = responseStatuses.filter((status) => status.startsWith("2") || status.startsWith("3"));

      let responseType = undefined;

      const responseTypes = [];
      for (const status of successfulResponse) {
        const response = methodDef.responses[status];
        if (response.$ref) {
          const responseDef = bundleResults.bundle.parsed.components.responses[response.$ref.split("/").pop()];

          for (const mediaType in responseDef.content) {
            const schema = responseDef.content[mediaType].schema;

            if (!responseType) {
              responseType = mediaType.split(";")[0];
            }

            if (schema?.$ref) {
              const name = schema.$ref.split("/").pop();
              extraTypes[`Response${name}`] = `components["schemas"]["${name}"]`;
              responseTypes.push(`Response${name}`);
            }
          }
        }
      }

      const bodyTypes = [];
      if (methodDef.requestBody?.$ref) {
        const name = methodDef.requestBody.$ref.split("/").pop();
        extraTypes[`Body${name}`] = `components["schemas"]["${name}"]`;
        bodyTypes.push(`Body${name}`);
      }

      const queryTypes = [];
      if (methodDef.parameters?.length) {
        const anyQueryParams = methodDef.parameters.some((param: any) => {
          if (param.in === "query") {
            return true;
          }

          if (param.$ref) {
            const ref = param.$ref;

            const paramDef = bundleResults.bundle.parsed.components.parameters[ref.split("/").pop()];
            return paramDef.in === "query";
          }
          return false;
        });

        if (anyQueryParams) {
          extraTypes[`Query${upperFirst(id)}`] = `operations["${id}"]["parameters"]["query"]`;
          queryTypes.push(`Query${upperFirst(id)}`);
        }
      }

      const requestHeaderTypes = [];
      if (methodDef.parameters?.length) {
        const anyHeaderParams = methodDef.parameters.some((param: any) => {
          if (param.in === "header") {
            return true;
          }

          if (param.$ref) {
            const ref = param.$ref;

            const paramDef = bundleResults.bundle.parsed.components.parameters[ref.split("/").pop()];
            return paramDef.in === "header";
          }
          return false;
        });

        if (anyHeaderParams) {
          extraTypes[`Headers${upperFirst(id)}`] = `NonNullable<operations["${id}"]["parameters"]["header"]>`;
          requestHeaderTypes.push(`Headers${upperFirst(id)}`);
        }
      }

      const responseHeaderTypes = [];

      let pathParams = [];
      if (methodDef.parameters?.length) {
        pathParams = methodDef.parameters.reduce((pathParams, param: any) => {
          if (param.in === "path") {
            pathParams.push(param.name);
          } else if (param.$ref) {
            const ref = param.$ref;

            const paramDef = bundleResults.bundle.parsed.components.parameters[ref.split("/").pop()];
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
        pathParams.length > 0 ? `.paramsOf<"${pathParams.join("|")}">()` : "",
        responseTypes.length > 0 ? `.responseOf<${responseTypes.join("|")}>()` : "",
        bodyTypes.length > 0 ? `.bodyOf<${bodyTypes.join("|")}>()` : "",
        queryTypes.length > 0 ? `.queryOf<${queryTypes.join("|")}>()` : "",
        requestHeaderTypes.length > 0 ? `.requestHeadersOf<${requestHeaderTypes.join("|")}>()` : "",
        responseHeaderTypes.length > 0 ? `.responseHeadersOf<${responseHeaderTypes.join("|")}>()` : "",
      ];

      return `export const ${id} = API.endpoint()
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

  return `// Type Defs\n\n${types}\n${extraTypesSource}\n\n//API Def\n\n${source}`;
};
