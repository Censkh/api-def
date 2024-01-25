import { Api } from "api-def";

let mockingEnabled = false;

//setRequestBackend(new AxiosRequestBackend(axios as any));

export const setMockingEnabled = (enabled: boolean): void => {
  mockingEnabled = enabled;
};

export const isMockingEnabled = () => {
  return mockingEnabled;
};

const api = new Api({
  name: "Test API",
  baseUrl: "https://jsonplaceholder.typicode.com/",
  mocking: {
    enabled: isMockingEnabled,
  },
});

export type User = { id: string; name: string; username: string; email: string };

export const fetchUsers = api
  .endpoint()
  .responseOf<Array<User>>()
  .build({
    id: "fetch_users",
    path: "/users",
    method: "get",

    mocking: {
      delay: [250, 500],
      handler: async (req, res) => {
        return res.status(200).send([
          {
            id: "asdad",
            name: "Mock User",
            email: "mock@user.com",
            username: "mock_user",
          },
        ]);
      },
    },
  });

export default api;
