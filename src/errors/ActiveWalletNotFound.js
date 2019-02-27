// @flow

class ActiveWalletNotFoundError extends Error {
  constructor() {
    const message = 'Active wallet not found'
    super(message)
    this.name = 'ActiveWalletNotFoundError'

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

export default ActiveWalletNotFoundError
