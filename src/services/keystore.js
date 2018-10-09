// @flow

import uuidv4 from 'uuid/v4'
import utils from 'jwallet-web-keystore'

const ADDRESS_TYPE: 'address' = 'address'
const MNEMONIC_TYPE: 'mnemonic' = 'mnemonic'
const TEST_PASSWORD_DATA_LENGTH: number = 120

const checkWalletIsMnemonicType = (type: WalletType): void => {
  if (type !== MNEMONIC_TYPE) {
    throw new Error('Wallet type is not mnemonic')
  }
}

const checkWalletUniqueness = (
  wallets: Wallets,
  uniqueProperty: string,
  propertyName: string,
): void => {
  const foundWallet: ?Wallet = wallets.find((wallet: Wallet): boolean => {
    const propertyValue: string = wallet[propertyName]

    return propertyValue ? (propertyValue.toLowerCase() === uniqueProperty.toLowerCase()) : false
  })

  if (foundWallet) {
    throw new Error(`Wallet with this ${propertyName} already exists`)
  }
}

const testPassword = (password: string): void => {
  const testPasswordResult: PasswordResult = utils.testPassword(password)

  if (testPasswordResult.score < 3) {
    const { warning, suggestions } = testPasswordResult.feedback

    // TODO: update password suggestions
    throw new Error(warning || suggestions[0] || 'Weak password')
  }
}

const appendWallet = (wallets: Wallets, wallet: Wallet): Wallets => wallets.concat(wallet)

const createMnemonicWallet = (
  wallets: Wallets,
  walletData: WalletData,
  password: ?string,
): Wallets => {
  const {
    id,
    data,
    name,
    passwordOptions,
    mnemonicOptions,
  }: WalletData = walletData

  if (!password) {
    throw new Error('Password required')
  }

  const mnemonic: string = data.toLowerCase()

  const {
    derivationPath,
    paddedMnemonicLength,
  }: MnemonicOptions = mnemonicOptions

  if (!utils.checkDerivationPathValid(derivationPath)) {
    throw new Error('Invalid derivation path')
  }

  const xpub: string = utils.getXPubFromMnemonic(mnemonic, mnemonicOptions)

  checkWalletUniqueness(wallets, xpub, 'bip32XPublicKey')

  const {
    salt,
    scryptParams,
    encryptionType,
    derivedKeyLength,
  }: PasswordOptions = passwordOptions

  const dKey: Uint8Array = utils.deriveKeyFromPassword(
    password,
    salt,
    scryptParams,
    derivedKeyLength,
  )

  const mnemonicPad: string = utils.leftPadString(mnemonic, ' ', paddedMnemonicLength)
  const mnemonicEnc: EncryptedData = utils.encryptData(mnemonicPad, dKey, encryptionType)

  return appendWallet(wallets, {
    id,
    name,
    passwordOptions,
    mnemonicOptions,
    addressIndex: 0,
    isReadOnly: false,
    type: MNEMONIC_TYPE,
    bip32XPublicKey: xpub,
    customType: 'mnemonic',
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
    type: MNEMONIC_TYPE,
    bip32XPublicKey: data,
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
    throw new Error('Password required')
  }

  const address: string = utils.getAddressFromPrivateKey(data)

  checkWalletUniqueness(wallets, address, 'address')

  const {
    salt,
    scryptParams,
    encryptionType,
    derivedKeyLength,
  }: PasswordOptions = passwordOptions

  const dKey: Uint8Array = utils.deriveKeyFromPassword(
    password,
    salt,
    scryptParams,
    derivedKeyLength,
  )

  return appendWallet(wallets, {
    id,
    name,
    address,
    passwordOptions,
    isReadOnly: false,
    type: ADDRESS_TYPE,
    customType: 'privateKey',
    encrypted: {
      mnemonic: null,
      privateKey: utils.encryptPrivateKey(data, dKey, encryptionType),
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
    address: data,
    isReadOnly: true,
    type: ADDRESS_TYPE,
    customType: 'address',
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

  if (utils.checkMnemonicValid(data)) {
    return createMnemonicWallet(wallets, walletData, password)
  } else if (utils.checkBip32XPublicKeyValid(data)) {
    return createReadOnlyMnemonicWallet(wallets, walletData)
  } else if (utils.checkPrivateKeyValid(data)) {
    return createAddressWallet(wallets, walletData, password)
  } else if (utils.checkAddressValid(data)) {
    return createReadOnlyAddressWallet(wallets, walletData)
  } else {
    throw new Error('Wallet data not provided or invalid')
  }
}

const initPassword = (
  password: string,
  passwordOptions: PasswordOptions,
): EncryptedData => {
  testPassword(password)

  const {
    salt,
    scryptParams,
    encryptionType,
  }: PasswordOptions = passwordOptions

  const testPasswordData: string = utils.generateSalt(TEST_PASSWORD_DATA_LENGTH)
  const dKey: Uint8Array = utils.deriveKeyFromPassword(password, salt, scryptParams)

  const testPasswordDataEnc: EncryptedData = utils.encryptData(
    testPasswordData,
    dKey,
    encryptionType,
  )

  return testPasswordDataEnc
}

const checkPassword = (
  testPasswordData: EncryptedData,
  password: string,
  passwordOptions: PasswordOptions,
): void => {
  const {
    salt,
    scryptParams,
    encryptionType,
  }: PasswordOptions = passwordOptions

  const dKey: Uint8Array = utils.deriveKeyFromPassword(password, salt, scryptParams)

  const testPasswordDataDec: ?string = utils.decryptData(
    testPasswordData,
    dKey,
    encryptionType,
  )

  if (!testPasswordDataDec) {
    throw new Error('Password is invalid')
  }
}

/*
const setPassword = (
  keystore: Keystore,
  password: string,
  newPassword: string,
  passwordOptionsUser?: ?PasswordOptionsUser,
): Keystore => {
  const {
    wallets,
    passwordOptions,
    testPasswordData,
  }: Keystore = keystore

  const passwordOptionsNew: PasswordOptions = utils.getPasswordOptions(passwordOptionsUser)

  const derivedKey: Uint8Array = utils.deriveKeyFromPassword(
    password,
    passwordOptions.salt,
    passwordOptions.scryptParams,
  )

  const testPasswordDataDec: string = utils.decryptData(
    testPasswordData,
    derivedKey,
    passwordOptions.encryptionType,
  )

  const derivedKeyNew: Uint8Array = utils.deriveKeyFromPassword(
    newPassword,
    passwordOptionsNew.salt,
    passwordOptionsNew.scryptParams,
  )

  const testPasswordDataEnc: EncryptedData = utils.encryptData(
    testPasswordDataDec,
    derivedKeyNew,
    passwordOptionsNew.encryptionType,
  )

  const walletsReEnc: Wallets = reEncryptWallets(
    wallets,
    derivedKey,
    derivedKeyNew,
    passwordOptions.encryptionType,
    passwordOptionsNew.encryptionType,
  )

  return {
    wallets: walletsReEnc,
    passwordOptions: passwordOptionsNew,
    testPasswordData: testPasswordDataEnc,
  }
}
*/

export default {
  createWallet,
  initPassword,
  testPassword,
  checkPassword,
  checkWalletUniqueness,
  checkWalletIsMnemonicType,
}
