// @flow

/**
 * Wallets
 */
export function selectWallets(state: State): WalletsState {
  return state.wallets
}

export function selectWalletsItems(state: State): Wallets {
  return state.wallets.items
}

export function selectActiveWalletId(state: State): ?WalletId {
  return state.wallets.activeWalletId
}

export function selectWalletsCreate(state: State): WalletsCreateState {
  return state.walletsCreate
}

export function selectWalletsImport(state: State): WalletsImportState {
  return state.walletsImport
}

export function selectWalletsBackup(state: State): WalletsBackupState {
  return state.walletsBackup
}

export function selectWalletsAddresses(state: State): WalletsAddressesState {
  return state.walletsAddresses
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

export function selectNetworkId(): ?NetworkId {
  return '3'
}

/**
 * Digital Assets
 */
export function selectDigitalAssets(state: State): DigitalAssetsState {
  return state.digitalAssets
}

export function selectDigitalAssetsItems(state: State): DigitalAssets {
  return state.digitalAssets.items
}

export function selectDigitalAssetsBalances({ digitalAssets }: State): Balances {
  return digitalAssets.balances
}

export function selectCurrentDigitalAsset(state: State): ?Address {
  return state.digitalAssets.currentAddress
}

export function selectCustomAsset(state: State): CustomAssetState {
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
