// @flow

class WalletInvalidDataError extends Error {
  walletId: ?WalletId

  constructor(walletId: ?WalletId, message: string = '') {
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
