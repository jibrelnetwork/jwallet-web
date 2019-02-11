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
  encryptionType: string,
): string {
  const wallet: Wallet = getWallet(wallets, walletId)

  if (checkMnemonicType(wallet.type)) {
    return getMnemonic(wallets, walletId, internalKey, encryptionType)
  } else {
    return getPrivateKey(wallet, internalKey, encryptionType)
  }
}

export default getBackupData
