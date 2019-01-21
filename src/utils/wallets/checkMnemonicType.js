// @flow

import config from 'config'

function checkMnemonicType(walletType: ?WalletType): boolean {
  return (walletType === config.mnemonicWalletType)
}

export default checkMnemonicType
