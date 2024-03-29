type RetryFunction<A> = (bail: (e: Error) => void, attemptCount: number) => A | Promise<A>;

export interface RetryOptionsCore {
  /**
   * The maximum amount of times to retry the operation.
   * @default 10
   */
  retries: number;
  /**
   * The exponential factor to use.
   * @default 2
   */
  factor: number;
  /**
   * The number of milliseconds before starting the first retry.
   * @default 1000
   */
  minTimeout: number;
  /**
   * The maximum number of milliseconds between two retries.
   * @default Infinity
   */
  maxTimeout: number;
  /**
   * Randomizes the timeouts by multiplying a factor between 1-2.
   * @default false
   */
  randomize: boolean;
}

export interface RetryOptionsInt extends RetryOptionsCore {
  onRetry?: (e: Error, attempt: number) => any;
  /**
   * Whether to retry forever.
   * @default false
   */
  forever?: boolean;
  /**
   * Whether to [unref](https://nodejs.org/api/timers.html#timers_unref) the setTimeout's.
   * @default false
   */
  unref?: boolean;
  /**
   * The maximum time (in milliseconds) that the retried operation is allowed to run.
   * @default Infinity
   */
  maxRetryTime?: number;
}

export type RetryOptions = Partial<RetryOptionsInt>;
