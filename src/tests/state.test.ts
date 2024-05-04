import { Api } from "../Api";

it("can provide extra state to a request that a middleware can use ", async () => {
  const api = new Api({
    baseUrl: "httpstat.us",
    name: "Http Status API",

    mocking: {
      enabled: true,
    },

    middleware: [
      {
        beforeSend: (context) => {
          if (context.requestConfig.state.cookies) {
            context.updateHeaders({
              Cookie: context.requestConfig.state.cookies,
            });
          }
        },
      },
    ],
  });

  const cookiesEndpoint = api
    .endpoint()
    .stateOf<{ cookies: string }>()
    .responseOf<{
      cookies: string | undefined;
    }>()
    .build({
      id: "cookies",
      method: "get",
      path: "/200",

      mocking: {
        handler: (req, res) => {
          return res.status(200).send({
            cookies: req.headers.Cookie as any,
          });
        },
      },
    });

  const {
    data: { cookies },
  } = await cookiesEndpoint.submit({
    state: {
      cookies: "test=123",
    },
  });
  expect(cookies).toBe("test=123");
});
