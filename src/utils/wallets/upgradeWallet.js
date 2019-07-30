// @flow strict

import { strip0x } from 'utils/address'
import { encryptData } from 'utils/encryption'
import { getXPRVFromMnemonic } from 'utils/mnemonic'
import { WalletInconsistentDataError } from 'errors'

import {
  getTypeByInput,
  checkReadOnlyType,
} from '.'

export type UpgradeWalletData = {|
  +wallet: Wallet,
  +data: ?string,
  +passphrase: ?string,
  +derivationPath: ?string,
  +internalKey: Uint8Array,
|}

function addMnemonic(
  {
    xpub,
    id: walletId,
  }: Wallet,
  mnemonic: string,
  passphrase: ?string,
  derivationPath: ?string,
  internalKey: Uint8Array,
): WalletUpdatedData {
  if (!xpub) {
    throw new WalletInconsistentDataError({ walletId }, 'Wallet xpub is empty')
  }

  return {
    encrypted: {
      mnemonic: encryptData({
        key: internalKey,
        data: mnemonic.toLowerCase(),
      }),
      passphrase: encryptData({
        key: internalKey,
        data: passphrase || '',
      }),
      xprv: encryptData({
        key: internalKey,
        data: getXPRVFromMnemonic(mnemonic, passphrase, derivationPath),
      }),
      privateKey: null,
    },
    customType: 'mnemonic',
    derivationPath: (derivationPath || '').trim(),
    isReadOnly: false,
  }
}

function addXPRV(
  {
    xpub,
    id: walletId,
  }: Wallet,
  xprv: string,
  internalKey: Uint8Array,
): WalletUpdatedData {
  if (!xpub) {
    throw new WalletInconsistentDataError({ walletId }, 'Wallet xpub is empty')
  }

  return {
    encrypted: {
      xprv: encryptData({
        data: xprv,
        key: internalKey,
      }),
      mnemonic: null,
      passphrase: null,
      privateKey: null,
    },
    customType: 'xprv',
    isReadOnly: false,
  }
}

function addPrivateKey(
  {
    address,
    id: walletId,
  }: Wallet,
  privateKey: string,
  internalKey: Uint8Array,
): WalletUpdatedData {
  if (!address) {
    throw new WalletInconsistentDataError({ walletId }, 'Wallet address is empty')
  }

  return {
    encrypted: {
      privateKey: encryptData({
        key: internalKey,
        data: strip0x(privateKey.toLowerCase()),
      }),
      xprv: null,
      mnemonic: null,
      passphrase: null,
    },
    customType: 'privateKey',
    isReadOnly: false,
  }
}

export function upgradeWallet({
  wallet,
  data,
  passphrase,
  derivationPath,
  internalKey,
}: UpgradeWalletData): WalletUpdatedData {
  const {
    customType,
    id: walletId,
  }: Wallet = wallet

  if (!checkReadOnlyType(customType)) {
    throw new WalletInconsistentDataError({ walletId }, 'Wallet is not read only')
  }

  const preparedData: string = (data || '').trim()
  const inputType: ?WalletCustomType = getTypeByInput(preparedData)

  switch (inputType) {
    case 'mnemonic':
      return addMnemonic(
        wallet,
        preparedData,
        passphrase,
        derivationPath,
        internalKey,
      )

    case 'xprv':
      return addXPRV(
        wallet,
        preparedData,
        internalKey,
      )

    case 'privateKey':
      return addPrivateKey(
        wallet,
        preparedData,
        internalKey,
      )

    default:
      throw new Error('Invalid input type')
  }
}
