// @flow

import {
  getWallet,
  getMnemonic,
  getPrivateKey,
  checkMnemonicType,
} from '.'

function getBackupData(wallets: Wallets, walletId: string, password: string): string {
  const wallet: Wallet = getWallet(wallets, walletId)

  if (checkMnemonicType(wallet.type)) {
    return getMnemonic(wallets, walletId, password)
  } else {
    return getPrivateKey(wallet, password)
  }
}

export default getBackupData
