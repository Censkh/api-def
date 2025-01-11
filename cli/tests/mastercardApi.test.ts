import * as fs from "node:fs";
import { openApiToSourceCode } from "../OpenApiToSourceCode";

it("1. generated types match", async () => {
  const output = await openApiToSourceCode({
    openApiPath: require.resolve("./mastercard-processing-core-api-swagger.yaml"),
  });

  const expected = fs.readFileSync(require.resolve("./MastercardApi.ts"), "utf-8");
  expect(output).toEqual(expected);
});
