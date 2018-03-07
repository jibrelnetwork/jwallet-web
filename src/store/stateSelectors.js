// @flow

import { find, propEq } from 'ramda'

import ethereum from 'data/assets/ethereum'

export function selectNetworkId(state: State): NetworkId {
  return state.networks.items[state.networks.currentNetworkIndex].id
}

export function selectReceiveFunds(state: State): ReceiveFundsData {
  return state.receiveFunds
}

export function selectSendFunds(state: State): SendFundsData {
  return state.sendFunds
}

export function selectDigitalAssets(state: State): DigitalAssetsData {
  return state.digitalAssets
}

export function selectDigitalAssetsItems(state: State): DigitalAssets {
  return state.digitalAssets.items
}

export function selectDigitalAssetsBalances(state: State): Balances {
  return state.digitalAssets.balances
}

export function selectAddCustomAsset(state: State): AddCustomAssetData {
  return state.addCustomAsset
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

export function selectMnemonicAddresses(state: State): MnemonicAddressesData {
  return state.mnemonicAddresses
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

/**
 * Deprecated
 */

export function selectDigitalAssetItem(state: State, symbol: string): DigitalAsset {
  return find(propEq('symbol', symbol))(state.currencies.items) || ethereum
}

export function selectKeystore(state: State): KeystoreData {
  return state.keystore
}

export function selectKeystoreKeys(state: State): Wallets {
  return state.keystore.accounts
}

export function selectCurrentKeyId(state: State): AccountId {
  return state.keystore.currentAccount.id
}
