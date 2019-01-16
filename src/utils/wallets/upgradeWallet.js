// @flow

import utils from '@jibrelnetwork/jwallet-web-keystore'

import config from 'config'
import getAddressFromPrivateKey from 'utils/address/getAddressFromPrivateKey'

import {
  getWallet,
  checkMnemonicType,
} from 'utils/wallets'

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

  return updateWallet(wallets, id, {
    mnemonicOptions,
    passwordOptions,
    encrypted: {
      mnemonic: utils.encryptMnemonic(mnemonic, password, passwordOptions),
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

  return updateWallet(wallets, id, {
    passwordOptions,
    encrypted: {
      privateKey: utils.encryptPrivateKey(privateKey, password, passwordOptions),
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
