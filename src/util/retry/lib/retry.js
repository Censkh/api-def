import RetryOperation from "./retryOperation";

export function operation(options) {
  var timeouts = _timeouts(options);
  return new RetryOperation(timeouts, {
      forever: options && (options.forever || options.retries === Infinity),
      unref: options && options.unref,
      maxRetryTime: options && options.maxRetryTime,
  });
}

const _timeouts = function (options) {

  function createTimeout(attempt, opts) {
    var random = (opts.randomize)
      ? (Math.random() + 1)
      : 1;

    var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
    timeout = Math.min(timeout, opts.maxTimeout);

    return timeout;
  }

  if (options instanceof Array) {
    return [].concat(options);
  }

  var opts = {
    retries: 10,
    factor: 2,
    minTimeout: 1 * 1000,
    maxTimeout: Infinity,
    randomize: false,
  };
  for (var key in options) {
    opts[key] = options[key];
  }

  if (opts.minTimeout > opts.maxTimeout) {
    throw new Error("minTimeout is greater than maxTimeout");
  }

  var timeouts = [];
  for (var i = 0; i < opts.retries; i++) {
    timeouts.push(createTimeout(i, opts));
  }

  if (options && options.forever && !timeouts.length) {
    timeouts.push(createTimeout(i, opts));
  }

  // sort the array numerically ascending
  timeouts.sort(function (a, b) {
    return a - b;
  });

  return timeouts;
};
export { _timeouts as timeouts };
