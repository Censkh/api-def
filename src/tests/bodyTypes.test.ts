import test                 from "ava";
import {postFormUrlEncoded} from "./mock/MockApi";

test("correctly parses body for form url encoded request", async (t) => {

  const res = await postFormUrlEncoded.submit({
    body: {
      test: 123,
      b   : "test",
    },
  });

  t.deepEqual(res.data, [
    "test=123&b=test",
  ]);

});
