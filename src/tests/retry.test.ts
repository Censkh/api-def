import test                      from "ava";
import api, {fetchRequiresToken} from "./mock/MockApi";

test("allow for retries in middleware", async (t) => {
  let thrownError;
  try {
    await fetchRequiresToken.submit({});
  } catch (e: any) {
    thrownError = e;
  }

  t.is(thrownError.toJSON, undefined);
  t.like(thrownError, {
    response: {
      data  : {
        code: "auth/invalid-token",
      },
      status: 400,
    },
  });


  t.like(await fetchRequiresToken.submit({
    headers: {
      "token": "test",
    },
  }), {
    status: 200,
    data  : {hello: true},
  });

  api.middleware.push({
    error: (context) => {
      if (context.error?.response?.data?.code === "auth/invalid-token") {
        context.updateHeaders({
          "token": "updated-token",
        });
        return {
          type: "retry",
        };
      }
    },
  });

  t.like(await fetchRequiresToken.submit({}), {
    status: 200,
    data  : {hello: true},
  });
});
