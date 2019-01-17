// @flow

import config from 'config'
import strip0x from 'utils/address/strip0x'

import {
  getWallet,
  checkMnemonicType,
} from 'utils/wallets'

import {
  encryptData,
  deriveKeyFromPassword,
} from 'utils/encryption'

import updateWallet from './updateWallet'

function addMnemonic(
  wallets: Wallets,
  wallet: Wallet,
  password: string,
  mnemonic: string,
  passwordOptions: PasswordOptions,
  mnemonicOptions: MnemonicOptions,
): Wallets {
  const {
    id,
    type,
    bip32XPublicKey,
  }: Wallet = wallet

  if (!checkMnemonicType(type) || !bip32XPublicKey) {
    throw new Error('WalletDataError')
  }

  const {
    salt,
    scryptParams,
    encryptionType,
    derivedKeyLength,
  }: PasswordOptions = passwordOptions

  return updateWallet(wallets, id, {
    mnemonicOptions,
    passwordOptions,
    encrypted: {
      mnemonic: encryptData({
        encryptionType,
        data: mnemonic,
        derivedKey: deriveKeyFromPassword(password, scryptParams, derivedKeyLength, salt),
      }),
      privateKey: null,
    },
    customType: config.mnemonicWalletType,
    isReadOnly: false,
  })
}

function addPrivateKey(
  wallets: Wallets,
  wallet: Wallet,
  password: string,
  privateKey: string,
  passwordOptions: PasswordOptions,
): Wallets {
  const {
    id,
    type,
    address,
  }: Wallet = wallet

  if (checkMnemonicType(type) || !address) {
    throw new Error('WalletDataError')
  }

  const {
    salt,
    scryptParams,
    encryptionType,
    derivedKeyLength,
  }: PasswordOptions = passwordOptions

  return updateWallet(wallets, id, {
    passwordOptions,
    encrypted: {
      privateKey: encryptData({
        encryptionType,
        data: strip0x(privateKey),
        derivedKey: deriveKeyFromPassword(password, scryptParams, derivedKeyLength, salt),
      }),
      mnemonic: null,
    },
    customType: 'privateKey',
    isReadOnly: false,
  })
}

function upgradeWallet(
  wallets: Wallets,
  walletId: WalletId,
  password: string,
  data: string,
  passwordOptions: PasswordOptions,
  mnemonicOptions?: MnemonicOptions,
): Wallets {
  const wallet: Wallet = getWallet(wallets, walletId)

  if (!wallet.isReadOnly) {
    throw new Error('WalletDataError')
  }

  const preparedData: string = data.trim().toLowerCase()

  if (checkMnemonicType(wallet.type)) {
    if (!mnemonicOptions) {
      throw new Error('WalletDataError')
    }

    return addMnemonic(wallets, wallet, password, preparedData, passwordOptions, mnemonicOptions)
  }

  return addPrivateKey(wallets, wallet, password, preparedData, passwordOptions)
}

export default upgradeWallet
