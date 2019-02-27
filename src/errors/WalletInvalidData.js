// @flow

class WalletInvalidDataError extends Error {
  walletId: ?WalletId

  constructor(walletId: ?WalletId, message: string = '') {
    if (!message) {
      // eslint-disable-next-line fp/no-mutation, no-param-reassign
      message = 'Invalid wallet data'
    }

    super(message)
    this.name = 'WalletInvalidDataError'
    this.walletId = walletId

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

export default WalletInvalidDataError
