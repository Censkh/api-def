# 0.6.0

## Breaking Changes

- axios will enforce `ResponseType`

## Features

- add `ResponseOf`, `QueryOf`, `BodyOf`, `ParamsOf` to quickly get types from endpoints

## Fixes

- absolute paths as `baseUrl` is now supported in fetch backend

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
