// @flow

import utils from '@jibrelnetwork/jwallet-web-keystore'

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
  }: PasswordOptions = passwordOptions

  const dKey: Uint8Array = utils.deriveKeyFromPassword(password, salt, scryptParams)
  const mnemonic: string = utils.decryptData(encrypted.mnemonic, dKey, encryptionType)

  return mnemonic.trim()
}

export default getMnemonic
