// @flow

class ActiveNetworkNotFoundError extends Error {
  constructor() {
    super()
    this.name = 'ActiveNetworkNotFoundError'

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error()).stack
    }
  }
}

export default ActiveNetworkNotFoundError
