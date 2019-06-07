// @flow strict

import { strip0x } from 'utils/address'
import { encryptData } from 'utils/encryption'
import { getXPRVFromMnemonic } from 'utils/mnemonic'
import { WalletInconsistentDataError } from 'errors'

import { checkReadOnlyType } from '.'

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
        data: mnemonic,
        key: internalKey,
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
        data: strip0x(privateKey),
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
    xpub,
    customType,
    id: walletId,
  }: Wallet = wallet

  if (!checkReadOnlyType(customType)) {
    throw new WalletInconsistentDataError({ walletId }, 'Wallet is not read only')
  }

  const preparedData: string = (data || '').trim().toLowerCase()

  if (xpub) {
    return addMnemonic(
      wallet,
      preparedData,
      passphrase,
      derivationPath,
      internalKey,
    )
  }

  return addPrivateKey(
    wallet,
    preparedData,
    internalKey,
  )
}
