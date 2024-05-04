import type { RetryOptions, RetryOptionsInt } from "../interfaces";
import RetryOperation from "./retryOperation";

export const operation = (options: RetryOptions): RetryOperation => {
  const timeouts = _timeouts(options);
  return new RetryOperation(timeouts, {
    forever: options && (options.forever || options.retries === Number.POSITIVE_INFINITY),
    unref: options?.unref,
    maxRetryTime: options?.maxRetryTime,
  });
};

const _timeouts = (options: RetryOptions): number[] => {
  const createTimeout = (attempt: number, opts: RetryOptionsInt) => {
    const random = opts.randomize ? Math.random() + 1 : 1;

    let timeout = Math.round(random * Math.max(opts.minTimeout, 1) * opts.factor ** attempt);
    timeout = Math.min(timeout, opts.maxTimeout);

    return timeout;
  };

  const defaultRetries = 10;
  const opts: RetryOptionsInt = {
    retries: defaultRetries,
    factor: 2,
    minTimeout: 1 * 1000,
    maxTimeout: Number.POSITIVE_INFINITY,
    randomize: false,
    ...options,
  };

  if (opts.minTimeout! > opts.maxTimeout!) {
    throw new Error("minTimeout is greater than maxTimeout");
  }

  const timeouts = [];
  const numRetries = opts.retries ?? defaultRetries;
  for (let i = 0; i < numRetries; i++) {
    timeouts.push(createTimeout(i, opts));
  }

  if (options?.forever && !timeouts.length) {
    timeouts.push(createTimeout(numRetries, opts));
  }

  // sort the array numerically ascending
  timeouts.sort((a, b) => a - b);

  return timeouts;
};
