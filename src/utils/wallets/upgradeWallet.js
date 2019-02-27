// @flow

import config from 'config'
import strip0x from 'utils/address/strip0x'
import encryptData from 'utils/encryption/encryptData'

import { WalletInvalidDataError } from 'errors'

import {
  getWallet,
  checkMnemonicType,
} from 'utils/wallets'

import updateWallet from './updateWallet'

type UpgradeWalletData = {|
  +items: Wallets,
  +mnemonicOptions: ?MnemonicOptions,
  +data: string,
  +walletId: WalletId,
  +encryptionType: string,
  +internalKey: Uint8Array,
|}

function addMnemonic(
  wallets: Wallets,
  wallet: Wallet,
  mnemonic: string,
  mnemonicOptions: MnemonicOptions,
  internalKey: Uint8Array,
  encryptionType: string,
): Wallets {
  const {
    id,
    type,
    bip32XPublicKey,
  }: Wallet = wallet

  if (!checkMnemonicType(type) || !bip32XPublicKey) {
    throw new WalletInvalidDataError(wallet.id, 'Invalid wallet mnemonic type')
  }

  const {
    network,
    passphrase,
    derivationPath,
  }: MnemonicOptions = mnemonicOptions

  return updateWallet(wallets, id, {
    network,
    derivationPath,
    encrypted: {
      mnemonic: encryptData({
        encryptionType,
        data: mnemonic,
        key: internalKey,
      }),
      passphrase: encryptData({
        encryptionType,
        key: internalKey,
        data: passphrase.trim().toLowerCase(),
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
  privateKey: string,
  internalKey: Uint8Array,
  encryptionType: string,
): Wallets {
  const {
    id,
    type,
    address,
  }: Wallet = wallet

  if (checkMnemonicType(type) || !address) {
    throw new WalletInvalidDataError(wallet.id, 'Invalid wallet mnemonic type')
  }

  return updateWallet(wallets, id, {
    encrypted: {
      privateKey: encryptData({
        encryptionType,
        key: internalKey,
        data: strip0x(privateKey),
      }),
      mnemonic: null,
      passphrase: null,
    },
    customType: 'privateKey',
    isReadOnly: false,
  })
}

function upgradeWallet({
  items,
  mnemonicOptions,
  data,
  walletId,
  internalKey,
  encryptionType,
}: UpgradeWalletData): Wallets {
  const wallet: Wallet = getWallet(items, walletId)

  if (!wallet.isReadOnly) {
    throw new WalletInvalidDataError(walletId, 'Wallet is read only')
  }

  const preparedData: string = data.trim().toLowerCase()

  if (checkMnemonicType(wallet.type)) {
    if (!mnemonicOptions) {
      throw new WalletInvalidDataError(walletId, 'Invalid mnemonic options')
    }

    return addMnemonic(items, wallet, preparedData, mnemonicOptions, internalKey, encryptionType)
  }

  return addPrivateKey(items, wallet, preparedData, internalKey, encryptionType)
}

export default upgradeWallet
