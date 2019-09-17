// @flow strict

import { StorageError } from 'errors'
import { getAddressName } from 'utils/address'

import {
  getAddress,
  getAddresses,
  checkMultiAddressType,
} from 'utils/wallets'

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

export function selectWallet(state: AppState, walletId: WalletId): Wallet {
  const items: Wallets = selectWalletsItems(state)

  if (!items.length) {
    throw new StorageError('Wallets are absent')
  }

  return items.find(({ id }: Wallet): boolean => (id === walletId)) || items[0]
}

export function selectActiveWallet(state: AppState): WalletId {
  const {
    items,
    activeWalletId,
  }: WalletsPersist = selectWalletsPersist(state)

  if (!items.length) {
    throw new StorageError('Wallets are absent')
  }

  return selectWallet(
    state,
    activeWalletId,
  )
}

export function selectActiveWalletId(state: AppState): WalletId {
  const activeWallet: Wallet = selectActiveWallet(state)

  return activeWallet.id
}

export function selectActiveWalletAddress(state: AppState): OwnerAddress {
  const activeWallet: Wallet = selectActiveWallet(state)

  return getAddress(activeWallet)
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
