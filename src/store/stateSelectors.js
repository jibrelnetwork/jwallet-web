// @flow

export function selectNetworks(state: State): NetworksData {
  return state.networks
}

export function selectNetworksItems(state: State): Networks {
  return state.networks.items
}

export function selectNetworkId(state: State): ?NetworkId {
  return state.networks.currentNetwork
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

export function selectDigitalAssets(state: State): DigitalAssetsData {
  return state.digitalAssets
}

export function selectDigitalAssetsItems(state: State): DigitalAssets {
  return state.digitalAssets.items
}

export function selectDigitalAssetsBalances(state: State): Balances {
  return state.digitalAssets.balances
}

export function selectCurrentDigitalAsset(state: State): ?Address {
  return state.digitalAssets.currentAddress
}

export function selectCustomAsset(state: State): CustomAssetData {
  return state.customAsset
}

export function selectTransactions(state: State): TransactionsData {
  return state.transactions
}

export function selectTransactionsItems(state: State): Transactions {
  return state.transactions.items
}

export function selectReceiveFunds(state: State): ReceiveFundsData {
  return state.receiveFunds
}

export function selectSendFunds(state: State): SendFundsData {
  return state.sendFunds
}
