// @flow

import config from 'config'

import {
  strip0x,
  getAddressFromPrivateKey,
} from 'utils/address'

import {
  getWallet,
  checkMnemonicType,
} from 'utils/wallets'

import {
  encryptData,
  deriveKeyFromPassword,
} from 'utils/encryption'

import {
  getXPubFromMnemonic,
  checkDerivationPathValid,
} from 'utils/mnemonic'

import updateWallet from './updateWallet'

function addMnemonic(
  wallets: Wallets,
  wallet: Wallet,
  password: string,
  mnemonicUser: string,
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

  const mnemonic: string = mnemonicUser.toLowerCase()

  if (!checkDerivationPathValid(mnemonicOptions.derivationPath)) {
    throw new Error('DerivationPathInvalidError')
  }

  const xpubFromMnemonic: string = getXPubFromMnemonic(mnemonic, mnemonicOptions)

  if (bip32XPublicKey.toLowerCase() !== xpubFromMnemonic.toLowerCase()) {
    throw new Error('MnemonicInvalidError')
  }

  const {
    salt,
    scryptParams,
    encryptionType,
    derivedKeyLength,
  }: PasswordOptions = passwordOptions

  const dKey: Uint8Array = deriveKeyFromPassword(password, scryptParams, derivedKeyLength, salt)

  return updateWallet(wallets, id, {
    mnemonicOptions,
    passwordOptions,
    encrypted: {
      mnemonic: encryptData({
        encryptionType,
        data: mnemonic,
        derivedKey: dKey,
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

  const addressFromPrivateKey: string = getAddressFromPrivateKey(privateKey)

  if (address.toLowerCase() !== addressFromPrivateKey.toLowerCase()) {
    throw new Error('PrivateKeyInvalidError')
  }

  const {
    salt,
    scryptParams,
    encryptionType,
    derivedKeyLength,
  }: PasswordOptions = passwordOptions

  const dKey: Uint8Array = deriveKeyFromPassword(password, scryptParams, derivedKeyLength, salt)

  return updateWallet(wallets, id, {
    passwordOptions,
    encrypted: {
      privateKey: encryptData({
        encryptionType,
        derivedKey: dKey,
        data: strip0x(privateKey),
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

  if (checkMnemonicType(wallet.type)) {
    if (!mnemonicOptions) {
      throw new Error('WalletDataError')
    }

    return addMnemonic(wallets, wallet, password, data, passwordOptions, mnemonicOptions)
  }

  return addPrivateKey(wallets, wallet, password, data, passwordOptions)
}

export default upgradeWallet
