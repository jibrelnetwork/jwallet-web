// @flow

import uuidv4 from 'uuid/v4'
import utils from '@jibrelnetwork/jwallet-web-keystore'

import config from 'config'

import testPassword from 'utils/encryption/testPassword'

import {
  checkAddressValid,
  getAddressChecksum,
  checkPrivateKeyValid,
  getAddressFromPrivateKey,
} from 'utils/address'

import {
  checkMnemonicValid,
  getXPubFromMnemonic,
  checkDerivationPathValid,
  checkBip32XPublicKeyValid,
} from 'utils/mnemonic'

import {
  appendWallet,
  checkWalletUniqueness,
} from '.'

function leftPadString(stringToPad: string, padChar: string, totalLength: number) {
  const leftPad: string = padChar.repeat(totalLength - stringToPad.length)

  return `${leftPad}${stringToPad}`
}

function createMnemonicWallet(
  wallets: Wallets,
  walletData: WalletData,
  password: ?string,
): Wallets {
  const {
    id,
    data,
    name,
    passwordOptions,
    mnemonicOptions,
  }: WalletData = walletData

  if (!password) {
    throw new Error('PasswordEmptyError')
  }

  const mnemonic: string = data.toLowerCase()

  const {
    derivationPath,
    paddedMnemonicLength,
  }: MnemonicOptions = mnemonicOptions

  if (!checkDerivationPathValid(derivationPath)) {
    throw new Error('DerivationPathInvalidError')
  }

  const xpub: string = getXPubFromMnemonic(mnemonic, mnemonicOptions)

  checkWalletUniqueness(wallets, xpub, 'bip32XPublicKey')

  const {
    salt,
    scryptParams,
    encryptionType,
  }: PasswordOptions = passwordOptions

  const dKey: Uint8Array = utils.deriveKeyFromPassword(password, salt, scryptParams)
  const mnemonicPad: string = leftPadString(mnemonic, ' ', paddedMnemonicLength)
  const mnemonicEnc: EncryptedData = utils.encryptData(mnemonicPad, dKey, encryptionType)

  return appendWallet(wallets, {
    id,
    name,
    passwordOptions,
    mnemonicOptions,
    addressIndex: 0,
    isReadOnly: false,
    bip32XPublicKey: xpub,
    type: config.mnemonicWalletType,
    customType: config.mnemonicWalletType,
    encrypted: {
      privateKey: null,
      mnemonic: mnemonicEnc,
    },
    /**
     * Another wallet data, necessary for consistency of types
     */
    address: null,
  })
}

const createReadOnlyMnemonicWallet = (wallets: Wallets, walletData: WalletData): Wallets => {
  const {
    id,
    data,
    name,
  }: WalletData = walletData

  checkWalletUniqueness(wallets, data, 'bip32XPublicKey')

  return appendWallet(wallets, {
    id,
    name,
    addressIndex: 0,
    isReadOnly: true,
    bip32XPublicKey: data,
    type: config.mnemonicWalletType,
    customType: 'bip32Xpub',
    encrypted: {
      mnemonic: null,
      privateKey: null,
    },
    /**
     * Another wallet data, necessary for consistency of types
     */
    address: null,
    passwordOptions: null,
    mnemonicOptions: null,
  })
}

const createAddressWallet = (
  wallets: Wallets,
  walletData: WalletData,
  password: ?string,
): Wallets => {
  const {
    id,
    data,
    name,
    passwordOptions,
  }: WalletData = walletData

  if (!password) {
    throw new Error('PasswordEmptyError')
  }

  const address: string = getAddressFromPrivateKey(data)

  checkWalletUniqueness(wallets, address, 'address')

  const {
    salt,
    scryptParams,
    encryptionType,
  }: PasswordOptions = passwordOptions

  const dKey: Uint8Array = utils.deriveKeyFromPassword(password, salt, scryptParams)

  return appendWallet(wallets, {
    id,
    name,
    address,
    passwordOptions,
    isReadOnly: false,
    customType: 'privateKey',
    type: config.addressWalletType,
    encrypted: {
      mnemonic: null,
      privateKey: utils.encryptData(data, dKey, encryptionType, true),
    },
    /**
     * Another wallet data, necessary for consistency of types
     */
    addressIndex: null,
    mnemonicOptions: null,
    bip32XPublicKey: null,
  })
}

const createReadOnlyAddressWallet = (wallets: Wallets, walletData: WalletData): Wallets => {
  const {
    id,
    data,
    name,
  }: WalletData = walletData

  checkWalletUniqueness(wallets, data, 'address')

  return appendWallet(wallets, {
    id,
    name,
    isReadOnly: true,
    type: config.addressWalletType,
    address: getAddressChecksum(data),
    customType: config.addressWalletType,
    encrypted: {
      mnemonic: null,
      privateKey: null,
    },
    /**
     * Another wallet data, necessary for consistency of types
     */
    addressIndex: null,
    bip32XPublicKey: null,
    passwordOptions: null,
    mnemonicOptions: null,
  })
}

const createWallet = (
  wallets: Wallets,
  walletNewData: WalletNewData,
  password?: string,
): Wallets => {
  const {
    passwordOptions,
    mnemonicOptions,
    data,
    name,
  }: WalletNewData = walletNewData

  if (password) {
    testPassword(password)
  }

  if (name) {
    checkWalletUniqueness(wallets, name, 'name')
  }

  const id: string = uuidv4()

  const walletData: WalletData = {
    id,
    data,
    passwordOptions,
    mnemonicOptions,
    name: name || id,
  }

  if (checkMnemonicValid(data)) {
    return createMnemonicWallet(wallets, walletData, password)
  } else if (checkBip32XPublicKeyValid(data)) {
    return createReadOnlyMnemonicWallet(wallets, walletData)
  } else if (checkPrivateKeyValid(data)) {
    return createAddressWallet(wallets, walletData, password)
  } else if (checkAddressValid(data)) {
    return createReadOnlyAddressWallet(wallets, walletData)
  } else {
    throw new Error('WalletDataError')
  }
}

export default createWallet
