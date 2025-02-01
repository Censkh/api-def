import {$} from "bun";

await $`bun cli/index.ts generate --noHeader --noConfig cli/tests/fixtures/mastercard-processing-core-api-swagger.yaml cli/tests/fixtures/MastercardProcessingCoreApi.ts`;
await $`bun cli/index.ts generate --noHeader --noConfig cli/tests/fixtures/mastercard-id-verification-api-swagger.yaml cli/tests/fixtures/MastercardIdVerificationApi.ts`;
await $`bun cli/index.ts generate --noHeader cli/tests/fixtures/onesignal-openapi.yaml cli/tests/fixtures/OneSignalYamlApi.ts`;
await $`bun cli/index.ts generate --noHeader cli/tests/fixtures/onesignal-openapi.json cli/tests/fixtures/OneSignalJsonApi.ts`;