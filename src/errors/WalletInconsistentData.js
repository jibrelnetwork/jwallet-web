// @flow

class WalletInconsistentDataError extends Error {
  walletId: ?WalletId

  constructor(message: string = '', walletId: ?WalletId) {
    super(message)
    this.name = 'WalletInconsistentDataError'
    this.walletId = walletId

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

export default WalletInconsistentDataError
