import { RetryFunction,
         RetryOptions }               from "./interfaces";
import * as retrier                   from "./lib/retry";

// Retry is just transplanted from here:
// https://www.npmjs.com/package/retry (lib), and
// https://www.npmjs.com/package/async-retry (RetryFunction)

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
