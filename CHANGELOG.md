# 0.12.0

## Breaking Changes

- Rename `cache` option to `clientCache` to avoid confusion with browser's cache parameter
- `Endpoint.computePath` is replaced by `Endpoint.resolvePath`

## Features

- Add request timing information via `startTimestamp` and `durationMs` in `RequestContextStats`
- Add support for browser's cache via `browserCache` option in RequestConfig
- Add polyfill support for browser cache in Axios backend using Cache-Control headers
- streaming response type
- add CLI to generate api-def from openapi spec
- add `reconfigure` method to `Api` & `Endpoint` to allow for changing options after creation
- support for path params surrounded by curly braces, e.g. `/users/{id}`
- add `updateBody` to `RequestContext` to allow for changing the body in middleware

# 0.11.1

- expose `retry` util

# 0.11.0

- change `headers` to be a native `Headers` object
- fix `FormData` default header

# 0.10.2

- export `RequestError` type

# 0.10.0

## Features

- add `state` to `RequestConfig` to allow for custom state to be passed through the request middleware
- add `EndpointBuilder.stateOf`

## Changes

- fix support for cloudflare workers
- add `credentials` option
- deprecated `RequestContext.computedConfig` in favor of `RequestContext.requestConfig`

# 0.9.3

- fix non-array buffer and non-json responses having their data as `Promise`

# 0.9.0

- update error messages to be more helpful
- add `updateMethod`, `updatePath` & `updateBaseUrl` to `RequestContext` to enhance middleware capabilities
- hide internal `computedPath` from `RequestContext`, replaced with `path`

# 0.8.5

- allow params to be inferred from the path
- zod validation

# 0.8.4

- upper case methods

# 0.8.3

## Changes

- change default retry logic to always retry unless you pass `shouldRetry` predicate
- add `minDelay` and `maxDelay` to retry logic

# 0.8.2

## Changes

- add request backend at `Api` level too

# 0.8.0

## Changes

- **Breaking:** if no response type given, use inferred
- deprecate `queryParser` (it's actually a stringifier) and replace with `queryHandling.stringify`
- allow `query` to be an arbitrary string

# 0.7.3

## Changes

- expose type for `Endpoint`
- fix `fetch` detection in node

# 0.7.2

## Fixes

- bad response type inferring

# 0.7.1

## Fixes

- don't pass body to GET requests

# 0.7.0

## Breaking Changes

- parse body for `application/x-www-form-urlencoded`

## Changes

- add `request` info to errors

# 0.6.0

## Breaking Changes

- axios will enforce `ResponseType`

## Features

- add `ResponseOf`, `QueryOf`, `BodyOf`, `ParamsOf` to quickly get types from endpoints
- new `queryParser` config option to allow custom query string parsing
- better errors
- automatically lowercase header names
- `PATCH` method

## Fixes

- absolute paths as `baseUrl` is now supported in fetch backend
- don't re-use same requests based upon URL to allow for concurrent `POST` requests

# 0.5.0

## Breaking Changes

- Undocumented mocking API has been overhauled

## Changes

- Add mocking!
  - Restructured mocking so that mocks are defined on the endpoint level (documentation updated)
- Add `acceptableStatus` to specify which status codes are considered successful
- Extend retry logic to use exponential back-off, rather than retrying immediately
- Support for additional hot-request methods:
  - PUT, DELETE

# 0.4.1

- fix fetch backend not working with unbound fetch
- add better error handling on parse

# 0.4.0

## Breaking Changes

- Move config values from options object up one layer
- In config `retries` -> `retry`
- `defaults` -> `config`

## Changes

- Remove need for enum imports
- Make `name` and `description` optional in endpoint definition

# 0.3.11

## Changes

- Make fetch backend default if fetch is present
- Fix fetch backends text response type support

# 0.3.0

## Features

- allow defaults to be a function on api
- add content type header in fetch backend to match axios backend
- remove `flatted`
- polyfill object.assign for ie
- change retry logic so that if a middleware event responds with Retry we always attempt a retry

# 0.2.5

## Changes

- Remove `window` usages to allow node support
