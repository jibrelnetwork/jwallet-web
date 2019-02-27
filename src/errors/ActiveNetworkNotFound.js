// @flow

class ActiveNetworkNotFoundError extends Error {
  constructor() {
    const message = 'Active network not found'
    super(message)
    this.name = 'ActiveNetworkNotFoundError'

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

export default ActiveNetworkNotFoundError
