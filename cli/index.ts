import * as fs from "node:fs";
import { program } from "commander";
import { openApiToSourceCode } from "./OpenApiToSourceCode";

program.name("api-def");

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));
program.version(packageJson.version);

program
  .command("generate-defs")
  .argument("<inPath>", "Path to the OpenAPI spec")
  .argument("<outPath>", "Path to the output file")
  .description("Generate an api-def from an OpenAPI spec")
  .action(async (inPath, outPath) => {
    const output = await openApiToSourceCode({
      openApiPath: inPath,
    });
    fs.writeFileSync(outPath, output);
  });

program.parse(process.argv);
