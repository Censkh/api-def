import * as fs from "node:fs";
import { bundle, createConfig } from "@redocly/openapi-core";
import chalk from "chalk/source";
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
  const ast = await openapiTS(inContents, {
    rootTypes: true,
  });

  const bundleResults = await bundle({
    ref: openApiPath,
    config: await createConfig({}),
  });
  const routes = bundleResults.bundle.parsed.paths;

  // now generate the api-def API

  const server = bundleResults.bundle.parsed.servers[0];

  let extraTypes = "";

  const source = `import { Api } from "api-def";

const API = new Api({
  name: "${bundleResults.bundle.parsed.info.title || "Generate Api"}",
  baseUrl: "${server.url}",
});

${Object.entries(routes)
  .flatMap(([path, route]: [string, any]) => {
    return Object.entries(route).map(([method, methodDef]: [string, any]) => {
      const id = methodDef.operationId;

      const responseStatuses = Object.keys(methodDef.responses);
      const successfulResponse = responseStatuses.filter((status) => status.startsWith("2") || status.startsWith("3"));

      const responseTypes = [];
      for (const status of successfulResponse) {
        const response = methodDef.responses[status];
        if (response.$ref) {
          responseTypes.push(`Response${response.$ref.split("/").pop()}`);
        }
      }

      const bodyTypes = [];
      if (methodDef.requestBody?.$ref) {
        bodyTypes.push(`RequestBody${methodDef.requestBody.$ref.split("/").pop()}`);
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
          extraTypes += `export type Query${upperFirst(id)} = operations["${id}"]["parameters"]["query"];\n`;
          queryTypes.push(`Query${upperFirst(id)}`);
        }
      }

      const methodColor = METHOD_COLORS[method] || chalk.gray;

      console.log(`Generating ${methodColor(method.toUpperCase())} '${id}'`);

      const endpointParts = [
        responseTypes.length > 0 ? `.response<${responseTypes.join("|")}>()` : "",
        bodyTypes.length > 0 ? `.body<${bodyTypes.join("|")}>()` : "",
        queryTypes.length > 0 ? `.query<${queryTypes.join("|")}>()` : "",
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

export default API;
    `;

  const types = astToString(ast);

  return `// Type Defs\n\n${types}\n${extraTypes}\n\n//API Def\n\n${source}`;
};
