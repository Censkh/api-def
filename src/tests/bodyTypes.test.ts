import type { ResponseOf } from "../UtilTypes";
import { postFormUrlEncoded } from "./mock/MockApi";

it("correctly parses body for form url encoded request", async () => {
  const res = await postFormUrlEncoded.submit({
    body: {
      test: 123,
      b: "test",
    },
  });

  expect(res.data).toEqual(["test=123&b=test"]);
});

// also test ResponseOf
type ResponseOfFormUrlEncoded = ResponseOf<typeof postFormUrlEncoded>;

// @ts-expect-error
const a: ResponseOfFormUrlEncoded = { data: 123 };
