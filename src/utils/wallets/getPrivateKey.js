// @flow

import {
  decryptData,
  deriveKeyFromPassword,
} from 'utils/encryption'

import {
  getMnemonicOptions,
  getPrivateKeyFromMnemonic,
} from 'utils/mnemonic'

import checkMnemonicType from './checkMnemonicType'

function getPrivateKey(wallet: Wallet, password: string): string {
  const {
    encrypted,
    passwordOptions,
    type,
    isReadOnly,
  }: Wallet = wallet

  if (isReadOnly || !passwordOptions) {
    throw new Error('WalletDataError')
  }

  const {
    salt,
    scryptParams,
    encryptionType,
    derivedKeyLength,
  }: PasswordOptions = passwordOptions

  const dKey: Uint8Array = deriveKeyFromPassword(password, scryptParams, derivedKeyLength, salt)

  if (checkMnemonicType(type)) {
    if (!encrypted.mnemonic) {
      throw new Error('WalletDataError')
    }

    const mnemonic: string = decryptData({
      encryptionType,
      derivedKey: dKey,
      data: encrypted.mnemonic,
    })

    const {
      addressIndex,
      mnemonicOptions,
    }: Wallet = wallet

    return getPrivateKeyFromMnemonic(
      mnemonic,
      addressIndex || 0,
      getMnemonicOptions(mnemonicOptions),
    )
  } else {
    if (!encrypted.privateKey) {
      throw new Error('WalletDataError')
    }

    return decryptData({
      encryptionType,
      derivedKey: dKey,
      data: encrypted.privateKey,
    })
  }
}

export default getPrivateKey
