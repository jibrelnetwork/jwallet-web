// @flow

import uuidv4 from 'uuid/v4'
import { t } from 'ttag'

import config from 'config'
import encryptData from 'utils/encryption/encryptData'
import { WalletInconsistentDataError } from 'errors'

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
  appendWallet,
  checkWalletUniqueness,
} from '.'

function max(a: number, b: number): number {
  return (a > b) ? a : b
}

function getNextOrderIndex(wallets: Wallets): number {
  const initial: number = wallets.length

  const current: number = wallets.reduce((
    result: number,
    { orderIndex }: Wallet,
  ): number => max(result, orderIndex), initial)

  return (current + 1)
}

function createMnemonicWallet(
  wallets: Wallets,
  walletData: WalletData,
  internalKey: Uint8Array,
  encryptionType: string,
): Wallets {
  const {
    id,
    data,
    name,
    orderIndex,
    isSimplified,
    mnemonicOptions,
    createdBlockNumber,
  }: WalletData = walletData

  const {
    network,
    passphrase,
    derivationPath,
  }: MnemonicOptions = mnemonicOptions

  if (!checkDerivationPathValid(derivationPath)) {
    throw new Error(t`DerivationPathInvalidError`)
  }

  const mnemonic: string = data.toLowerCase()
  const xpub: string = getXPubFromMnemonic(mnemonic, passphrase, derivationPath, network)

  checkWalletUniqueness(wallets, xpub, 'bip32XPublicKey')

  return appendWallet(wallets, {
    id,
    name,
    network,
    orderIndex,
    isSimplified,
    derivationPath,
    addressIndex: 0,
    isReadOnly: false,
    createdBlockNumber,
    bip32XPublicKey: xpub,
    type: config.mnemonicWalletType,
    customType: config.mnemonicWalletType,
    encrypted: {
      privateKey: null,
      mnemonic: encryptData({
        encryptionType,
        data: mnemonic,
        key: internalKey,
      }),
      passphrase: encryptData({
        encryptionType,
        data: passphrase,
        key: internalKey,
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
    orderIndex,
    isSimplified,
    createdBlockNumber,
  }: WalletData = walletData

  checkWalletUniqueness(wallets, data, 'bip32XPublicKey')

  return appendWallet(wallets, {
    id,
    name,
    orderIndex,
    isSimplified,
    addressIndex: 0,
    isReadOnly: true,
    createdBlockNumber,
    bip32XPublicKey: data,
    customType: 'bip32Xpub',
    type: config.mnemonicWalletType,
    encrypted: {
      mnemonic: null,
      privateKey: null,
      passphrase: null,
    },
    /**
     * Another wallet data, necessary for consistency of types
     */
    address: null,
    network: null,
    derivationPath: null,
  })
}

function createAddressWallet(
  wallets: Wallets,
  walletData: WalletData,
  internalKey: Uint8Array,
  encryptionType: string,
): Wallets {
  const {
    id,
    data,
    name,
    orderIndex,
    isSimplified,
    createdBlockNumber,
  }: WalletData = walletData

  const privateKey: string = data.toLowerCase()
  const address: string = getAddressFromPrivateKey(privateKey)
  checkWalletUniqueness(wallets, address, 'address')

  return appendWallet(wallets, {
    id,
    name,
    address,
    orderIndex,
    isSimplified,
    isReadOnly: false,
    createdBlockNumber,
    customType: 'privateKey',
    type: config.addressWalletType,
    encrypted: {
      mnemonic: null,
      passphrase: null,
      privateKey: encryptData({
        encryptionType,
        key: internalKey,
        data: strip0x(privateKey),
      }),
    },
    /**
     * Another wallet data, necessary for consistency of types
     */
    network: null,
    addressIndex: null,
    derivationPath: null,
    bip32XPublicKey: null,
  })
}

function createReadOnlyAddressWallet(wallets: Wallets, walletData: WalletData): Wallets {
  const {
    id,
    data,
    name,
    orderIndex,
    isSimplified,
    createdBlockNumber,
  }: WalletData = walletData

  checkWalletUniqueness(wallets, data, 'address')

  return appendWallet(wallets, {
    id,
    name,
    orderIndex,
    isSimplified,
    isReadOnly: true,
    createdBlockNumber,
    type: config.addressWalletType,
    address: getAddressChecksum(data),
    customType: config.addressWalletType,
    encrypted: {
      mnemonic: null,
      passphrase: null,
      privateKey: null,
    },
    /**
     * Another wallet data, necessary for consistency of types
     */
    network: null,
    addressIndex: null,
    derivationPath: null,
    bip32XPublicKey: null,
  })
}

function createWallet(
  wallets: Wallets,
  walletNewData: WalletNewData,
  internalKey: Uint8Array,
  encryptionType: string,
): Wallets {
  const {
    data,
    name,
    isSimplified,
    mnemonicOptions,
    createdBlockNumber,
  }: WalletNewData = walletNewData

  if (name) {
    checkWalletUniqueness(wallets, name, 'name')
  }

  const id: string = uuidv4()

  const walletData: WalletData = {
    id,
    data,
    isSimplified,
    mnemonicOptions,
    name: name || id,
    createdBlockNumber,
    orderIndex: getNextOrderIndex(wallets),
  }

  if (checkMnemonicValid(data)) {
    return createMnemonicWallet(wallets, walletData, internalKey, encryptionType)
  } else if (checkBip32XPublicKeyValid(data)) {
    return createReadOnlyMnemonicWallet(wallets, walletData)
  } else if (checkPrivateKeyValid(data)) {
    return createAddressWallet(wallets, walletData, internalKey, encryptionType)
  } else if (checkAddressValid(data)) {
    return createReadOnlyAddressWallet(wallets, walletData)
  } else {
    throw new WalletInconsistentDataError({ walletId: id }, 'createWallet data error')
  }
}

export default createWallet
