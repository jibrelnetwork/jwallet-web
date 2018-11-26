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
