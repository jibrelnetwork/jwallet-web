// @flow

import keystore from 'services/keystore'

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

export function selectActiveWalletAddress(state: AppState): ?Address {
  const {
    items,
    activeWalletId,
  } = selectWalletsPersist(state)

  if (activeWalletId) {
    return keystore.getAddress(items, activeWalletId)
  }

  return null
}

