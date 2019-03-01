// @flow

class WalletNotFoundError extends Error {
  walletId: ?WalletId

  constructor(walletId: ?WalletId) {
    super()
    this.name = 'WalletNotFoundError'
    this.walletId = walletId

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error()).stack
    }
  }
}

export default WalletNotFoundError
