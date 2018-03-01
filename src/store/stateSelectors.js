// @flow

import { find, propEq } from 'ramda'

import { ethereum } from 'utils/getDefaultDigitalAssets'

export function selectDigitalAssets(state: State): DigitalAssetsData {
  return state.currencies
}

export function selectDigitalAssetsItems(state: State): DigitalAssets {
  return state.currencies.items
}

export function selectDigitalAssetItem(state: State, symbol: string): DigitalAsset {
  return find(propEq('symbol', symbol))(state.currencies.items) || ethereum
}

export function selectKeystore(state: State): KeystoreData {
  return state.keystore
}

export function selectKeystoreKeys(state: State): Wallets {
  return state.keystore.accounts
}

export function selectReceiveFunds(state: State): ReceiveFundsData {
  return state.receiveFunds
}

export function selectSendFunds(state: State): SendFundsData {
  return state.sendFunds
}

export function selectCurrentKeyId(state: State): AccountId {
  return state.keystore.currentAccount.id
}

export function selectWallets(state: State): WalletsData {
  return state.wallets
}

export function selectWalletsItems(state: State): Wallets {
  return state.wallets.items
}

export function selectWalletId(state: State): ?WalletId {
  return state.wallets.activeWalletId
}

export function selectCreateWallet(state: State): CreateWalletData {
  return state.createWallet
}

export function selectImportWallet(state: State): ImportWalletData {
  return state.importWallet
}

export function selectEditWallet(state: State): EditWalletData {
  return state.editWallet
}

export function selectBackupWallet(state: State): BackupWalletData {
  return state.backupWallet
}

export function selectChangeWalletPassword(state: State): ChangeWalletPasswordData {
  return state.changeWalletPassword
}
