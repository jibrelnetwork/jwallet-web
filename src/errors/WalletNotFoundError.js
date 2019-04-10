// @flow

import JError, { type JErrorData } from './JError'

type WalletNotFoundErrorData = {|
  +walletId: WalletId,
|}

class WalletNotFoundError extends JError<WalletNotFoundErrorData> {
  constructor(data: JErrorData<WalletNotFoundErrorData>, message?: string) {
    super(data, message)
    this.name = 'WalletNotFoundError'
  }
}

export default WalletNotFoundError
