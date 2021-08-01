import api, {fetchRequiresToken} from "./mock/MockApi";

test("allow for retries in middleware", async () => {
  let thrownError;
  try {
    await fetchRequiresToken.submit({});
  } catch (e) {
    thrownError = e;
  }

  expect(thrownError).toMatchObject({
    response: {
      data  : {
        code: "auth/invalid-token",
      },
      status: 400,
    },
  });

  await expect(fetchRequiresToken.submit({
    headers: {
      "token": "test",
    },
  })).resolves.toMatchObject({
    status: 200,
    data  : "hi",
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

  await expect(fetchRequiresToken.submit({
  })).resolves.toMatchObject({
    status: 200,
    data  : "hi",
  });
});
