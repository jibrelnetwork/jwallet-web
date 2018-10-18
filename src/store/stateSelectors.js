// @flow

/**
 * Wallets
 */
export function selectWallets(state: State): WalletsState {
  return state.wallets
}

export function selectWalletsCreate(state: State): WalletsCreateState {
  return state.walletsCreate
}

export function selectWalletsImport(state: State): WalletsImportState {
  return state.walletsImport
}

export function selectWalletsItems(state: State): Wallets {
  return state.wallets.items
}

export function selectWalletsBackup(state: State): WalletsBackupState {
  return state.walletsBackup
}

export function selectMnemonicAddresses(state: State): MnemonicAddressesData {
  return state.mnemonicAddresses
}

/**
 * Networks
 */
export function selectNetworks(state: State): NetworksData {
  return state.networks
}

export function selectNetworksItems(state: State): Networks {
  return state.networks.items
}

export function selectNetworkId(state: State): ?NetworkId {
  return state.networks.currentNetwork
}

/**
 * Digital Assets
 */
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

/**
 * Transactions
 */
export function selectTransactions(state: State): TransactionsData {
  return state.transactions
}

export function selectTransactionsItems(state: State): Transactions {
  return state.transactions.items
}

/**
 * Funds
 */
export function selectReceiveFunds(state: State): ReceiveFundsData {
  return state.receiveFunds
}

export function selectSendFunds(state: State): SendFundsData {
  return state.sendFunds
}
