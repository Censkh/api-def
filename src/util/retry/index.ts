import * as retrier     from "./lib/retry";

// https://www.npmjs.com/package/retry, and
// https://www.npmjs.com/package/async-retry

// ---

type RetryFunction<A> = (bail: (e: Error) => void, attemptCount: number) => A|Promise<A>;

export interface RetryOptions {
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
 /**
  * The maximum amount of times to retry the operation.
  * @default 10
  */
  retries?: number;
  /**
   * The exponential factor to use.
   * @default 2
   */
 factor?: number;
 /**
  * The number of milliseconds before starting the first retry.
  * @default 1000
  */
 minTimeout?: number;
 /**
  * The maximum number of milliseconds between two retries.
  * @default Infinity
  */
 maxTimeout?: number;
 /**
  * Randomizes the timeouts by multiplying a factor between 1-2.
  * @default false
  */
 randomize?: boolean;
}

// ---

const retry = <A>(fn: RetryFunction<A>, opts: RetryOptions): Promise<A> => {

  return new Promise( (resolve, reject) => {

      const options = opts || {};

      if (!("randomize" in options)) {
        options.randomize = true;
      }

      const op = retrier.operation(options);

      // We allow the user to abort retrying
      // this makes sense in the cases where
      // knowledge is obtained that retrying
      // would be futile (e.g.: auth errors)

      const bail = (err?: Error) => {
        reject(err || new Error("Aborted"));
      };

      const onError = (err: any, num: number) => {
        if (err.bail) {
          bail(err);
          return;
        }

        if (!op.retry(err)) {
          reject(op.mainError());
        } else if (options.onRetry) {
          options.onRetry(err, num);
        }
      };

      const runAttempt = (num: number) => {
        let val;

        try {
          val = fn(bail, num);
        } catch (err) {
          onError(err, num);
          return;
        }

        Promise.resolve(val)
          .then(resolve)
          .catch(function catchIt(err) {
            onError(err, num);
          });
      };

      op.attempt(runAttempt);
    }
  );
};

export default retry;
