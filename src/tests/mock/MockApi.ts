import { Api } from "../../Api";
import { RequestMethod } from "../../ApiConstants";

const api = new Api({
  baseUrl: "example.com",
  name: "Example API",

  mocking: {
    enabled: true,
  },
});

export const fetchRequiresToken = api.endpoint().build({
  name: "Requires Token",
  id: "fetchRequiresToken",
  method: RequestMethod.GET,
  path: "/requires-token",

  mocking: {
    handler: (req, res) => {
      if (!req.headers.token) {
        return res.status(400).send({
          code: "auth/invalid-token",
        });
      }

      return res.status(200).send({ hello: true });
    },
  },
});

export const postFormUrlEncoded = api
  .endpoint()
  .bodyOf<{
    test: number;
    b: string;
  }>()
  .responseOf<string[]>()
  .build({
    id: "sendFormUrlEncoded",
    method: "post",
    path: "/send-data",

    config: {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    },

    mocking: {
      handler: (req, res) => {
        return res.status(200).send([req.body.toString()]);
      },
    },
  });

export const postConfiguredFormUrlEncoded = api
  .endpoint()
  .bodyOf<{
    test: number;
    b: string;
  }>({
    encoding: "application/x-www-form-urlencoded",
  })
  .responseOf<{ body: string; contentType: unknown }>()
  .build({
    id: "sendConfiguredFormUrlEncoded",
    method: "post",
    path: "/send-configured-form-data",

    mocking: {
      handler: (req, res) => {
        return res.status(200).send({
          body: req.body.toString(),
          contentType: req.headers["Content-Type"],
        });
      },
    },
  });

export const postMultipartFormData = api
  .endpoint()
  .bodyOf<{
    file: Blob;
    processingOptions: {
      keepAfterProcessing: boolean;
    };
    bytes: Uint8Array;
  }>({
    encoding: "multipart/form-data",
  })
  .responseOf<Array<[string, string]>>()
  .build({
    id: "sendMultipartFormData",
    method: "post",
    path: "/send-multipart-form-data",

    mocking: {
      handler: (req, res) => {
        return res
          .status(200)
          .send(
            Array.from((req.body as unknown as FormData).entries()).map(([key, value]) => [
              key,
              typeof value === "string" ? value : (value as Blob).constructor.name,
            ]),
          );
      },
    },
  });

export const postIdVerifStatus = api
  .endpoint()
  .bodyOf<{
    validationService: 1;
    forceReset: boolean; // i.e. create a new ID Verification
  }>()
  .responseOf<{
    transactionStatus: any;
    transactionId?: string; // the backend generates and assigns this for us
    verifPayload?: any; // we'll only ever get one-shot to store this before the BE service deletes the transaction
  }>()
  .build({
    id: "id-verif-status",
    method: RequestMethod.POST,
    path: "/id-verif/verif-status",
    responseType: "json",
    config: {
      acceptableStatus: [200],
      retry: false, // outcome screen has it's own retry
    },
    mocking: {
      handler: (req, res) => {
        return res.status(200).send({ url: req.url } as any);
      },
    },
  });

export default api;
