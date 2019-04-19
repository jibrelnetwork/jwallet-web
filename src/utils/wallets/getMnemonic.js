// @flow strict

import { decryptData } from 'utils/encryption'
import { WalletInconsistentDataError } from 'errors'

import {
  getWallet,
  checkMnemonicType,
} from '.'

function getMnemonic(
  wallets: Wallets,
  walletId: string,
  internalKey: Uint8Array,
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
    throw new WalletInconsistentDataError({ walletId }, 'Can\'t get mnemonic')
  }

  return decryptData({
    key: internalKey,
    data: encrypted.mnemonic,
  })
}

export default getMnemonic
