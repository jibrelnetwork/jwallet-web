// @flow

class WalletNotFoundError extends Error {
  walletId: ?WalletId

  constructor(walletId: ?WalletId) {
    const message = `Wallet ${walletId || 'null'} not found`
    super(message)
    this.name = 'WalletNotFoundError'
    this.walletId = walletId

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

export default WalletNotFoundError
