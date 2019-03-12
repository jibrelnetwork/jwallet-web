// @flow

import decryptData from 'utils/encryption/decryptData'
import { WalletInconsistentDataError } from 'errors'

import {
  getWallet,
  checkMnemonicType,
} from '.'

function getMnemonic(
  wallets: Wallets,
  walletId: string,
  internalKey: Uint8Array,
  encryptionType: string,
): string {
  const {
    encrypted,
    type,
    isReadOnly,
  }: Wallet = getWallet(wallets, walletId)

  if (
    isReadOnly ||
    !checkMnemonicType(type) ||
    !encrypted.mnemonic
  ) {
    throw new WalletInconsistentDataError('Can\'t get mnemonic', walletId)
  }

  return decryptData({
    encryptionType,
    key: internalKey,
    data: encrypted.mnemonic,
  })
}

export default getMnemonic
