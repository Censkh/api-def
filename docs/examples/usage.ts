import { Api, RequestMethod } from "../../src";

const api = new Api({
  name: "My Backend",
  baseUrl: "https://api.example.com/v1",
});

export const fetchHealthCheck = api.endpoint().responseOf<{ success: boolean }>().build({
  id: "fetch_health_check",
  path: "/status/health-check",
  method: RequestMethod.GET,
});

export const getHealthStatus = async (): Promise<boolean> => {
  const response = await fetchHealthCheck.submit({});
  return response.data.success;
};
