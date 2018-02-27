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

export function selectImportKey(state: State): ImportKeyData {
  return state.importKey
}

export function selectEditKey(state: State): EditKeyData {
  return state.editKey
}

export function selectWallets(state: State): Wallets {
  return state.keystore.accounts
}

export function selectWalletId(state: State): WalletId {
  return state.keystore.currentAccount.id
}

export function selectBackupWallet(state: State): BackupWalletData {
  return state.backupWallet
}

export function selectChangeWalletPassword(state: State): ChangeWalletPasswordData {
  return state.changeWalletPassword
}

export function selectCreateWallet(state: State): CreateWalletData {
  return state.createWallet
}
