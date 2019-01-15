// @flow

import utils from '@jibrelnetwork/jwallet-web-keystore'

import config from 'config'

import {
  getWallet,
  checkMnemonicType,
} from 'utils/wallets'

import {
  getMnemonicOptions,
  getXPubFromMnemonic,
  checkDerivationPathValid,
} from 'utils/mnemonic'

import updateWallet from './updateWallet'

function addMnemonic(
  wallets: Wallets,
  walletId: WalletId,
  password: string,
  mnemonicUser: string,
  mnemonicOptions: MnemonicOptions,
): Wallets {
  const {
    type,
    isReadOnly,
    bip32XPublicKey,
    passwordOptions,
  }: Wallet = getWallet(wallets, walletId)

  if (!checkMnemonicType(type) || !isReadOnly || !bip32XPublicKey) {
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

  return updateWallet(wallets, walletId, {
    mnemonicOptions,
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
  walletId: WalletId,
  password: string,
  privateKey: string,
): Wallets {
  const {
    type,
    address,
    isReadOnly,
    passwordOptions,
  }: Wallet = getWallet(wallets, walletId)

  if (checkMnemonicType(type) || !isReadOnly || !address) {
    throw new Error('WalletDataError')
  }

  const addressFromPrivateKey: string = utils.getAddressFromPrivateKey(privateKey)

  if (address.toLowerCase() !== addressFromPrivateKey.toLowerCase()) {
    throw new Error('PrivateKeyInvalidError')
  }

  return updateWallet(wallets, walletId, {
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
  mnemonicOptionsUser?: ?MnemonicOptionsUser,
): Wallets {
  const wallet: Wallet = getWallet(wallets, walletId)

  if (checkMnemonicType(wallet.type)) {
    const mOptions: MnemonicOptions = getMnemonicOptions(mnemonicOptionsUser)

    return addMnemonic(wallets, walletId, password, data, mOptions)
  }

  return addPrivateKey(wallets, walletId, password, data)
}

export default upgradeWallet
