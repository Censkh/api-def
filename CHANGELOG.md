# 0.3.x

## Features

- allow defaults to be a function on api
- add content type header in fetch backend to match axios backend
- remove `flatted`
- polyfill object.assign for ie
- change retry logic so that if a middleware event responds with Retry we always attempt a retry

# 0.2.5

## Changes

- Remove `window` usages to allow node support
