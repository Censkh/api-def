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

it("3. generated types match - opensignal json file", async () => {
  const output = await openApiToSourceCode({
    openApiPath: path.resolve(__dirname, "./fixtures/onesignal-openapi.json"),
    configFileLocation: "./OneSignalJsonApi.config",
  });

  const expected = fs.readFileSync(path.resolve(__dirname, "./fixtures/OneSignalJsonApi.ts"), "utf-8");
  expect(output).toEqual(expected);
});

it("4. generated types match - opensignal yaml file", async () => {
  const output = await openApiToSourceCode({
    openApiPath: path.resolve(__dirname, "./fixtures/onesignal-openapi.yaml"),
    configFileLocation: "./OneSignalYamlApi.config",
  });

  const expected = fs.readFileSync(path.resolve(__dirname, "./fixtures/OneSignalYamlApi.ts"), "utf-8");
  expect(output).toEqual(expected);
});

it("5. generated types match - rapyd", async () => {
  const output = await openApiToSourceCode({
    openApiPath: path.resolve(__dirname, "./fixtures/rapyd-openapi.yaml"),
  });

  const expected = fs.readFileSync(path.resolve(__dirname, "./fixtures/RapydApi.ts"), "utf-8");
  expect(output).toEqual(expected);
});
