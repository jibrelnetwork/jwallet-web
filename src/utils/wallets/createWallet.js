// @flow

import uuidv4 from 'uuid/v4'

import config from 'config'
import testPassword from 'utils/encryption/testPassword'

import {
  strip0x,
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
  encryptData,
  deriveKeyFromPassword,
} from 'utils/encryption'

import {
  appendWallet,
  checkWalletUniqueness,
} from '.'

function createMnemonicWallet(
  wallets: Wallets,
  walletData: WalletData,
  password: string,
): Wallets {
  const {
    id,
    data,
    name,
    passwordOptions,
    mnemonicOptions,
  }: WalletData = walletData

  if (!checkDerivationPathValid(mnemonicOptions.derivationPath)) {
    throw new Error('DerivationPathInvalidError')
  }

  const mnemonic: string = data.toLowerCase()
  const xpub: string = getXPubFromMnemonic(mnemonic, mnemonicOptions)

  checkWalletUniqueness(wallets, xpub, 'bip32XPublicKey')

  const {
    salt,
    scryptParams,
    encryptionType,
    derivedKeyLength,
  }: PasswordOptions = passwordOptions

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
      mnemonic: encryptData({
        encryptionType,
        data: mnemonic,
        derivedKey: deriveKeyFromPassword(password, scryptParams, derivedKeyLength, salt),
      }),
    },
    /**
     * Another wallet data, necessary for consistency of types
     */
    address: null,
  })
}

function createReadOnlyMnemonicWallet(wallets: Wallets, walletData: WalletData): Wallets {
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
    customType: 'bip32Xpub',
    type: config.mnemonicWalletType,
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

function createAddressWallet(wallets: Wallets, walletData: WalletData, password: string): Wallets {
  const {
    id,
    data,
    name,
    passwordOptions,
  }: WalletData = walletData

  const privateKey: string = data.toLowerCase()
  const address: string = getAddressFromPrivateKey(privateKey)
  checkWalletUniqueness(wallets, address, 'address')

  const {
    salt,
    scryptParams,
    encryptionType,
    derivedKeyLength,
  }: PasswordOptions = passwordOptions

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
      privateKey: encryptData({
        encryptionType,
        data: strip0x(privateKey),
        derivedKey: deriveKeyFromPassword(password, scryptParams, derivedKeyLength, salt),
      }),
    },
    /**
     * Another wallet data, necessary for consistency of types
     */
    addressIndex: null,
    mnemonicOptions: null,
    bip32XPublicKey: null,
  })
}

function createReadOnlyAddressWallet(wallets: Wallets, walletData: WalletData): Wallets {
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

function createWallet(
  wallets: Wallets,
  walletNewData: WalletNewData,
  password: string,
): Wallets {
  const {
    data,
    name,
    passwordOptions,
    mnemonicOptions,
  }: WalletNewData = walletNewData

  if (!password) {
    throw new Error('PasswordEmptyError')
  }

  testPassword(password)

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
