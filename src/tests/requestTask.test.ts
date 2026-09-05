import { Api } from "../Api";
import { bindRequestTask, createRequestTask, runRequestTask } from "../RequestTask";

const taskConsole = console as Console & { createTask?: unknown };
let originalDescriptor: PropertyDescriptor | undefined;

beforeEach(() => {
  originalDescriptor = Object.getOwnPropertyDescriptor(console, "createTask");
});

afterEach(() => {
  if (originalDescriptor) {
    Object.defineProperty(console, "createTask", originalDescriptor);
  } else {
    Reflect.deleteProperty(console, "createTask");
  }
});

const setCreateTask = (value: unknown): void => {
  Object.defineProperty(console, "createTask", { configurable: true, writable: true, value });
};

it("preserves values, promises, and thrown errors without task support", () => {
  setCreateTask(undefined);
  const context = {};
  createRequestTask(context, "get", "/users");
  const promise = Promise.resolve(42);
  const error = new Error("original failure");

  expect(runRequestTask(context, () => promise)).toBe(promise);
  expect(bindRequestTask(context, (value: number) => value + 1)(41)).toBe(42);
  expect(() =>
    runRequestTask(context, () => {
      throw error;
    }),
  ).toThrow(error);
});

it("binds delayed callbacks to their own task and preserves return values", () => {
  let activeTask = "";
  setCreateTask(function (this: Console, name: string) {
    expect(this).toBe(taskConsole);
    return {
      run<T>(callback: () => T): T {
        const previous = activeTask;
        activeTask = name;
        try {
          return callback();
        } finally {
          activeTask = previous;
        }
      },
    };
  });
  const first = {};
  const second = {};
  createRequestTask(first, "get", "/users?secret=hidden#fragment");
  createRequestTask(second, "post", "/users");
  const callback = bindRequestTask(first, (value: number) => {
    expect(activeTask).toBe("api-def GET /users");
    runRequestTask(second, () => expect(activeTask).toBe("api-def POST /users"));
    expect(activeTask).toBe("api-def GET /users");
    return value;
  });

  expect(callback(42)).toBe(42);
  expect(activeTask).toBe("");
});

it("creates a task synchronously per submit and tags retries and lifecycle handlers", async () => {
  const names: string[] = [];
  let activeTask = false;
  let attempts = 0;
  const events: string[] = [];
  setCreateTask((name: string) => {
    names.push(name);
    return {
      run<T>(callback: () => T): T {
        const previous = activeTask;
        activeTask = true;
        try {
          return callback();
        } finally {
          activeTask = previous;
        }
      },
    };
  });
  const observe = (name: string): undefined => {
    expect(activeTask).toBe(true);
    events.push(name);
    return undefined;
  };
  const api = new Api({
    name: "Task tagging",
    baseUrl: "https://example.com",
    mocking: { enabled: true },
    middleware: [
      {
        beforeSend: () => observe("beforeSend"),
        attemptError: () => observe("attemptError"),
        success: () => observe("success"),
        finally: () => observe("finally"),
      },
    ],
  });
  const endpoint = api.endpoint().build({
    id: "tagged",
    method: "get",
    path: "/users",
    defaultRequestConfig: { retry: { maxAttempts: 1, minDelay: 1, maxDelay: 1 } },
    mocking: {
      handler: (_context, response) => {
        expect(activeTask).toBe(true);
        attempts++;
        return response.status(attempts === 1 ? 503 : 200).send({ done: true });
      },
    },
  });

  const pending = endpoint.submit({});
  expect(names).toEqual(["api-def GET /users"]);
  expect((await pending).data).toEqual({ done: true });
  expect(attempts).toBe(2);
  expect(events).toEqual(["beforeSend", "attemptError", "success", "finally"]);
  await endpoint.submit({});
  expect(names).toEqual(["api-def GET /users", "api-def GET /users"]);
});
