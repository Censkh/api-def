import {Api} from "api-def";

let mockingEnabled = false;

export const setMockingEnabled = (enabled: boolean): void => {
  mockingEnabled = enabled;
};

export const isMockingEnabled = () => {
  return mockingEnabled;
};

const api = new Api({
  name   : "Test API",
  baseUrl: "https://jsonplaceholder.typicode.com/",
  mocking: {
    predicate: isMockingEnabled,
  },
});

export type User = { id: string; name: string; username: string; email: string };

export const fetchUsers = api.endpoint()
  .responseOf<Array<User>>()
  .build({
    id    : "fetch_users",
    path  : "/users",
    method: "get",
  })
  .mock(async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 750));

    return res.status(200).send([
      {
        id      : "asdad",
        name    : "Mock User",
        email   : "mock@user.com",
        username: "mock_user",
      },
    ]);
  });

export default api;
