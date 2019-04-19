// @flow

import {
  getWallet,
  getMnemonic,
  getPrivateKey,
  checkMnemonicType,
} from '.'

function getBackupData(
  wallets: Wallets,
  walletId: string,
  internalKey: Uint8Array,
): string {
  const wallet: Wallet = getWallet(wallets, walletId)

  if (checkMnemonicType(wallet.type)) {
    return getMnemonic(wallets, walletId, internalKey)
  } else {
    return getPrivateKey(wallet, internalKey)
  }
}

export default getBackupData
