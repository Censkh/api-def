export interface RetryOperationOptions {
  forever?: boolean;
  unref?: boolean;
  maxRetryTime?: number;
}

export interface RetryOperationTimeoutOptions {
  timeout?: number;
  cb?: (attempt?: number) => void;
}

export default class RetryOperation {
  constructor(timeouts: number[], options?: RetryOperationOptions);

  reset(): void;
  stop(): void;
  retry(error?: Error): boolean;
  attempt(fn: (attempt: number) => void, timeoutOps?: RetryOperationTimeoutOptions): void;
  try(fn: (attempt: number) => void): void;
  start(fn: (attempt: number) => void): void;
  errors(): Error[];
  attempts(): number;
  mainError(): Error | null;
}
