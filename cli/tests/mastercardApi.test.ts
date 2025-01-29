import * as fs from "node:fs";
import * as path from "node:path";
import { openApiToSourceCode } from "../OpenApiToSourceCode";

it("1. generated types match - processing core", async () => {
  const output = await openApiToSourceCode({
    openApiPath: path.resolve(__dirname, "./fixtures/mastercard-processing-core-api-swagger.yaml"),
  });

  const expected = fs.readFileSync(path.resolve(__dirname, "./fixtures/MastercardProcessingCoreApi.ts"), "utf-8");
  expect(output).toEqual(expected);
});

it("2. generated types match - id verification", async () => {
  const output = await openApiToSourceCode({
    openApiPath: path.resolve(__dirname, "./fixtures/mastercard-id-verification-api-swagger.yaml"),
  });

  const expected = fs.readFileSync(path.resolve(__dirname, "./fixtures/MastercardIdVerificationApi.ts"), "utf-8");
  expect(output).toEqual(expected);
});
