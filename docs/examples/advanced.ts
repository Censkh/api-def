import { Api, RequestMethod } from "../../src";

const api = new Api({
  name: "My Backend",
  baseUrl: "https://api.example.com/v1",
});

export const downloadReport = api
  .endpoint()
  .requestHeadersOf<{ Authorization: string }>()
  .responseOf<ArrayBuffer>()
  .build({
    id: "download_report",
    path: "/reports/latest",
    method: RequestMethod.GET,
    responseType: "arraybuffer",
  });

export const getReport = async (token: string): Promise<ArrayBuffer> => {
  const response = await downloadReport.submit({
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
