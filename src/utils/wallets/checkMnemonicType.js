// @flow strict

import config from 'config'

export function checkMnemonicType(walletType: ?string): boolean {
  return (walletType === config.mnemonicWalletType)
}
