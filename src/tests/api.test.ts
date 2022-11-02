import test                  from "ava";
import {postIdVerifStatus}   from "./mock/MockApi";

test("URL is properly constructed", async (t) => {

  const res = await postIdVerifStatus.submit({
    body: {
      forceReset       : true,
      validationService: 1,
    },
  });

  t.is((res.data as any).url, "https://example.com/id-verif/verif-status");

});
