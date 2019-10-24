// @flow

import JError, { type JErrorData } from './JError'

type WalletInconsistentDataErrorData = {|
  +walletId?: WalletId,
  +address?: string,
|}

class WalletInconsistentDataError extends JError<WalletInconsistentDataErrorData> {
  constructor(data: ?JErrorData<WalletInconsistentDataErrorData>, message?: string) {
    super(data, message)
    this.name = 'WalletInconsistentDataError'
  }
}

export default WalletInconsistentDataError
