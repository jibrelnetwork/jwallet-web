// @flow

import utils from '@jibrelnetwork/jwallet-web-keystore'

import add0x from 'utils/address/add0x'

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
  }: PasswordOptions = passwordOptions

  const dKey: Uint8Array = utils.deriveKeyFromPassword(password, salt, scryptParams)

  if (!checkMnemonicType(type)) {
    if (!encrypted.mnemonic) {
      throw new Error('WalletDataError')
    }

    const mnemonic: string = utils.decryptData(encrypted.mnemonic, dKey, encryptionType)

    const {
      mnemonicOptions,
      addressIndex,
    }: Wallet = wallet

    const privateKey: string = getPrivateKeyFromMnemonic(
      mnemonic,
      addressIndex || 0,
      getMnemonicOptions(mnemonicOptions),
    )

    return add0x(privateKey)
  } else {
    if (!encrypted.privateKey) {
      throw new Error('WalletDataError')
    }

    const privateKey: string = utils.decryptData(encrypted.privateKey, dKey, encryptionType)

    return add0x(privateKey)
  }
}

export default getPrivateKey
