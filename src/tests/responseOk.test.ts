import { isOkStatus } from "../ApiUtils";

it.each([
  [199, false],
  [200, true],
  [299, true],
  [300, false],
  [400, false],
])("reports status %i as ok: %s", (status, expected) => {
  expect(isOkStatus(status)).toBe(expected);
});
