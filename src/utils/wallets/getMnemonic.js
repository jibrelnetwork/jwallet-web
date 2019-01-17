// @flow

import {
  decryptData,
  deriveKeyFromPassword,
} from 'utils/encryption'

import {
  getWallet,
  checkMnemonicType,
} from '.'

function getMnemonic(wallets: Wallets, walletId: string, password: string): string {
  const {
    encrypted,
    passwordOptions,
    type,
    isReadOnly,
  }: Wallet = getWallet(wallets, walletId)

  if (
    !checkMnemonicType(type) ||
    isReadOnly ||
    !passwordOptions ||
    !encrypted.mnemonic
  ) {
    throw new Error('WalletDataError')
  }

  const {
    salt,
    scryptParams,
    encryptionType,
    derivedKeyLength,
  }: PasswordOptions = passwordOptions

  const dKey: Uint8Array = deriveKeyFromPassword(password, scryptParams, derivedKeyLength, salt)

  return decryptData({
    encryptionType,
    derivedKey: dKey,
    // $FlowFixMe
    data: encrypted.mnemonic,
  })
}

export default getMnemonic
