import * as fs from "node:fs";
import * as path from "node:path";
import { openApiToSourceCode } from "../OpenApiToSourceCode";

it("1. generated types match", async () => {
  const output = await openApiToSourceCode({
    openApiPath: path.resolve(__dirname, "./fixtures/mastercard-processing-core-api-swagger.yaml"),
  });

  const expected = fs.readFileSync(path.resolve(__dirname, "./fixtures/MastercardApi.ts"), "utf-8");
  expect(output).toEqual(expected);
});
