// @flow strict

import { getAddressName } from 'utils/address'

import {
  getAddress,
  getAddresses,
  getWalletById,
  checkMultiAddressType,
} from 'utils/wallets'

import {
  WalletNotFoundError,
  ActiveWalletNotFoundError,
} from 'errors'

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

export function selectSingleAddressWalletsNames(state: AppState): AddressNames {
  const items: Wallets = selectWalletsItems(state)

  return items.reduce((
    result: AddressNames,
    item: Wallet,
  ) => {
    const {
      name,
      customType,
      isSimplified,
    }: Wallet = item

    if (checkMultiAddressType(customType) && !isSimplified) {
      return result
    }

    const address: OwnerAddress = getAddress(item)

    return {
      ...result,
      [address]: name,
    }
  }, {})
}

export function selectActiveWalletId(state: AppState): ?WalletId {
  const walletsPersist: WalletsPersist = selectWalletsPersist(state)

  return walletsPersist.activeWalletId
}

export function selectActiveWalletIdOrThrow(state: AppState): WalletId {
  const activeWalletId = selectActiveWalletId(state)

  if (!activeWalletId) {
    throw new ActiveWalletNotFoundError()
  }

  return activeWalletId
}

export function selectWallet(state: AppState, walletId: WalletId): ?Wallet {
  const items: Wallets = selectWalletsItems(state)

  return items.find(({ id }: Wallet): boolean => (id === walletId))
}

export function selectWalletOrThrow(state: AppState, walletId: WalletId): Wallet {
  const wallet = selectWallet(state, walletId)

  if (!wallet) {
    throw new WalletNotFoundError({ walletId })
  }

  return wallet
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

export function selectActiveWalletOrThrow(state: AppState): Wallet {
  const activeWallet = selectActiveWallet(state)

  if (!activeWallet) {
    throw new ActiveWalletNotFoundError()
  }

  return activeWallet
}

export function selectActiveWalletAddress(state: AppState): ?OwnerAddress {
  const {
    items,
    activeWalletId,
  } = selectWalletsPersist(state)

  if (!activeWalletId) {
    return null
  }

  const wallet: ?Wallet = getWalletById(items, activeWalletId)

  if (!wallet) {
    return null
  }

  return getAddress(wallet)
}

export function selectActiveWalletAddressOrThrow(state: AppState): OwnerAddress {
  const address = selectActiveWalletAddress(state)

  if (!address) {
    throw new ActiveWalletNotFoundError()
  }

  return address
}

export function selectWalletsCreate(state: AppState): WalletsCreateState {
  return state.walletsCreate
}

export function selectWalletsCreatedBlockNumber(state: AppState): ?WalletCreatedBlockNumber {
  const walletsCreate: WalletsCreateState = selectWalletsCreate(state)

  return walletsCreate.createdBlockNumber
}

export function selectWalletsAddresses(state: AppState): WalletsAddressesState {
  return state.walletsAddresses
}

export function selectWalletsAddressesPersist(state: AppState): WalletsAddressesPersist {
  const walletsAddresses: WalletsAddressesState = selectWalletsAddresses(state)

  return walletsAddresses.persist
}

export function selectAddressNames(
  state: AppState,
  hasWalletName?: boolean = false,
): AddressNames {
  const { addressNames }: WalletsAddressesPersist = selectWalletsAddressesPersist(state)

  if (!hasWalletName) {
    return addressNames
  }

  const items: Wallets = selectWalletsItems(state)

  return items.reduce((
    walletsResult: AddressNames,
    item: Wallet,
  ): AddressNames => {
    const {
      name,
      xpub,
      customType,
      derivationIndex,
    }: Wallet = item

    if (!(checkMultiAddressType(customType) && xpub)) {
      return walletsResult
    }

    const addresses: Address[] = getAddresses(item, 0, derivationIndex || 0)

    const addressesResult: AddressNames = addresses.reduce((
      result: AddressNames,
      currentAddress: Address,
      currentIndex: number,
    ): AddressNames => {
      const addressName: ?string = addressNames[currentAddress]

      return {
        ...result,
        [currentAddress]: addressName || getAddressName(
          addressName,
          currentIndex,
          name,
        ),
      }
    }, {})

    return {
      ...walletsResult,
      ...addressesResult,
    }
  }, {})
}

export function selectWalletsRenameAddress(state: AppState): WalletsRenameAddressState {
  return state.walletsRenameAddress
}
