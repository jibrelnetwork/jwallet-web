// @flow

import keystore from 'services/keystore'
import getAddressWalletNames from 'utils/wallets/getAddressWalletNames'

export function selectWallets(state: AppState): WalletsState {
  return state.wallets
}

export function selectWalletsPersist(state: AppState): WalletsPersist {
  const wallets: WalletsState = selectWallets(state)

  return wallets.persist
}

export function selectWalletsItems(state: AppState): Wallets {
  const walletsPersist: WalletsPersist = selectWalletsPersist(state)

  return walletsPersist.items
}

export function selectAddressWalletsNames(state: AppState): AddressNames {
  const items: Wallets = selectWalletsItems(state)

  return items.reduce((result: AddressNames, {
    type,
    name,
    address,
  }: Wallet) => {
    const isAddressType: boolean = (type === 'address')

    if (isAddressType && address) {
      return {
        ...result,
        [address]: name,
      }
    }

    return result
  }, {})
}

export function selectActiveWalletId(state: AppState): ?WalletId {
  const walletsPersist: WalletsPersist = selectWalletsPersist(state)

  return walletsPersist.activeWalletId
}

export function selectWallet(state: AppState, walletId: WalletId): ?Wallet {
  const items: Wallets = selectWalletsItems(state)

  return items.find(({ id }: Wallet): boolean => (id === walletId))
}

export function selectActiveWallet(state: AppState): ?Wallet {
  const {
    items,
    activeWalletId,
  } = selectWalletsPersist(state)

  if (!activeWalletId) {
    return null
  }

  return items.find(({ id }: Wallet): boolean => (id === activeWalletId))
}

export function selectActiveWalletAddress(state: AppState): ?OwnerAddress {
  const {
    items,
    activeWalletId,
  } = selectWalletsPersist(state)

  if (!activeWalletId) {
    return null
  }

  return keystore.getAddress(items, activeWalletId)
}

export function selectAddressName(state: AppState, address: Address): ?string {
  const wallets: Wallets = selectWalletsItems(state)
  const names: AddressNames = getAddressWalletNames(wallets)

  return names[address]
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

export function selectWalletsAddressesPersist(state: AppState): WalletsAddressesPersist {
  const walletsAddresses: WalletsAddressesState = selectWalletsAddresses(state)

  return walletsAddresses.persist
}

export function selectAddressNames(state: AppState): AddressNames {
  const walletsAddressesPersist: WalletsAddressesPersist = selectWalletsAddressesPersist(state)

  return walletsAddressesPersist.addressNames
}

export function selectWalletsRenameAddress(state: AppState): WalletsRenameAddressState {
  return state.walletsRenameAddress
}
