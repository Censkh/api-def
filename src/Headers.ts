type HeaderEntry = readonly [string, string];

const normalizeName = (name: string): string => name.toLowerCase();

class SimpleHeaders {
  private readonly headers = new Map<string, string>();

  constructor(init?: HeadersInit) {
    if (!init) {
      return;
    }

    if (typeof (init as Headers).forEach === "function") {
      (init as Headers).forEach((value, key) => {
        this.append(key, value);
      });
      return;
    }

    if (Array.isArray(init)) {
      for (const [key, value] of init as HeaderEntry[]) {
        this.append(key, value);
      }
      return;
    }

    for (const key of Object.keys(init)) {
      this.append(key, (init as Record<string, string>)[key]!);
    }
  }

  append(name: string, value: string): void {
    const key = normalizeName(name);
    const current = this.headers.get(key);
    this.headers.set(key, current === undefined ? String(value) : `${current}, ${value}`);
  }

  delete(name: string): void {
    this.headers.delete(normalizeName(name));
  }

  get(name: string): string | null {
    return this.headers.get(normalizeName(name)) ?? null;
  }

  getSetCookie(): string[] {
    const value = this.get("set-cookie");
    return value ? [value] : [];
  }

  has(name: string): boolean {
    return this.headers.has(normalizeName(name));
  }

  set(name: string, value: string): void {
    this.headers.set(normalizeName(name), String(value));
  }

  forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void {
    for (const [key, value] of this.headers) {
      callbackfn.call(thisArg, value, key, this as unknown as Headers);
    }
  }
}

export const createHeaders = (init?: HeadersInit): Headers => {
  if (typeof Headers !== "undefined") {
    return new Headers(init);
  }

  return new SimpleHeaders(init) as unknown as Headers;
};
