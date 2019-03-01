// @flow

class ActiveWalletNotFoundError extends Error {
  constructor() {
    super()
    this.name = 'ActiveWalletNotFoundError'

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error()).stack
    }
  }
}

export default ActiveWalletNotFoundError
