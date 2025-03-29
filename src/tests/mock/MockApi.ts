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
