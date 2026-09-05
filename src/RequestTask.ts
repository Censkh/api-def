type RequestTask = {
  run<T>(callback: () => T): T;
};

const tasks = new WeakMap<object, RequestTask>();

export const createRequestTask = (context: object, method: string, path: string): void => {
  const taskConsole =
    typeof console === "undefined"
      ? undefined
      : (console as Console & {
          createTask?: (name: string) => RequestTask;
        });
  if (typeof taskConsole?.createTask === "function") {
    tasks.set(context, taskConsole.createTask(`api-def ${method.toUpperCase()} ${path.split(/[?#]/)[0]}`));
  }
};

export const runRequestTask = <T>(context: object, callback: () => T): T => {
  const task = tasks.get(context);
  return task ? task.run(callback) : callback();
};

export const bindRequestTask = <Args extends unknown[], Result>(
  context: object,
  callback: (...args: Args) => Result,
): ((...args: Args) => Result) => {
  return (...args) => runRequestTask(context, () => callback(...args));
};
