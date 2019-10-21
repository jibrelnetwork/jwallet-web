// @flow strict

import config from 'config'
import { strip0x } from 'utils/address'
import { leftPad } from 'utils/formatters'
import { encryptData } from 'utils/encryption'
import { WalletInconsistentDataError } from 'errors'

import {
  getXPUBFromXPRV,
  getXPRVFromMnemonic,
  getXPUBFromMnemonic,
  getAddressIndexFromXPUB,
} from 'utils/mnemonic'

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

function getAddressIndex(
  xpub,
  address,
  addressIndex,
): number {
  const addressIndexFromXPUB: number = address ? getAddressIndexFromXPUB(
    address,
    xpub,
  ) : -1

  return addressIndex || ((addressIndexFromXPUB !== -1)
    ? addressIndexFromXPUB
    : 0
  )
}

function addMnemonic(
  {
    encrypted,
    xpub,
    address,
    addressIndex,
    derivationIndex,
    isSimplified,
  }: Wallet,
  mnemonic: string,
  passphrase: ?string,
  derivationPath: ?string,
  internalKey: Uint8Array,
): WalletUpdatedData {
  const xpubNew: string = xpub || getXPUBFromMnemonic(
    mnemonic,
    passphrase,
    derivationPath,
  )

  const addressIndexNew: number = getAddressIndex(
    xpubNew,
    address,
    addressIndex,
  )

  return {
    encrypted: {
      ...encrypted,
      mnemonic: encryptData({
        key: internalKey,
        data: leftPad(
          mnemonic.toLowerCase(),
          ' ',
          config.encryptedMnemonicLength,
        ),
      }),
      passphrase: encryptData({
        key: internalKey,
        data: passphrase || '',
      }),
      xprv: encryptData({
        key: internalKey,
        data: getXPRVFromMnemonic(mnemonic, passphrase, derivationPath),
      }),
    },
    xpub: xpubNew,
    address: null,
    customType: 'mnemonic',
    derivationPath: (derivationPath || '').trim(),
    addressIndex: addressIndexNew,
    derivationIndex: derivationIndex || addressIndexNew,
    isReadOnly: false,
    isSimplified: (isSimplified !== null) ? isSimplified : true,
  }
}

function addXPRV(
  {
    encrypted,
    xpub,
    address,
    addressIndex,
    derivationIndex,
    isSimplified,
  }: Wallet,
  xprv: string,
  internalKey: Uint8Array,
): WalletUpdatedData {
  const xpubNew: string = xpub || getXPUBFromXPRV(xprv)

  const addressIndexNew: number = getAddressIndex(
    xpubNew,
    address,
    addressIndex,
  )

  return {
    encrypted: {
      ...encrypted,
      xprv: encryptData({
        data: xprv,
        key: internalKey,
      }),
    },
    address: null,
    customType: 'xprv',
    xpub: xpub || xpubNew,
    addressIndex: addressIndexNew,
    derivationIndex: derivationIndex || addressIndexNew,
    isReadOnly: false,
    isSimplified: (isSimplified !== null) ? isSimplified : true,
  }
}

function addPrivateKey(
  {
    encrypted,
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
      ...encrypted,
      privateKey: encryptData({
        key: internalKey,
        data: strip0x(privateKey.toLowerCase()),
      }),
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
