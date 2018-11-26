// @flow

/**
 * Wallets
 */
export function selectWallets(state: AppState): WalletsState {
  return state.wallets
}

export function selectWalletsPersist(state: AppState): WalletsPersist {
  return state.wallets.persist
}

export function selectWalletsItems(state: AppState): Wallets {
  return state.wallets.persist.items
}

export function selectActiveWalletId(state: AppState): ?WalletId {
  return state.wallets.persist.activeWalletId
}

export function selectWalletsCreate(state: AppState): WalletsCreateState {
  return state.walletsCreate
}

export function selectWalletsImport(state: AppState): WalletsImportState {
  return state.walletsImport
}

export function selectWalletsBackup(state: AppState): WalletsBackupState {
  return state.walletsBackup
}

export function selectWalletsAddresses(state: AppState): WalletsAddressesState {
  return state.walletsAddresses
}

export function selectWalletsAddressNames(state: AppState): AddressNames {
  return state.walletsAddresses.persist.addressNames
}

export function selectWalletsRenameAddress(state: AppState): WalletsRenameAddressState {
  return state.walletsRenameAddress
}

/**
 * Networks
 */
// export function selectNetworks(state: AppState): NetworksData {
//   return state.networks
// }

// export function selectNetworksItems(state: AppState): Networks {
//   return state.networks.items
// }

// eslint-disable-next-line no-unused-vars
export function selectNetworkId(state: AppState): NetworkId {
  return '3'
}

export function selectRPCProps(): RPCProps {
  return {
    rpcaddr: 'ropsten-node.jwallet.network',
    rpcport: 443,
    ssl: true,
  }
}

// export function selectEditAsset(state: AppState): EditAssetState {
//   return state.editAsset
// }

// /**
//  * Funds
//  */
// export function selectReceiveFunds(state: AppState): ReceiveFundsData {
//   return state.receiveFunds
// }

// export function selectSendFunds(state: AppState): SendFundsData {
//   return state.sendFunds
// }
