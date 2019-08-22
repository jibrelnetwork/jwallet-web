// @flow strict

import {
  selectAddressNames,
  selectSingleAddressWalletsNames,
} from './wallets'

export function selectFavoritesItems(state: AppState) {
  return state.favorites.persist.items
}

export function selectFavorite(state: AppState, address: OwnerAddress): ?Favorite {
  const items = selectFavoritesItems(state)

  return items[address]
}

export function selectFavoritesAddressNames(state: AppState): AddressNames {
  const items = selectFavoritesItems(state)

  return Object.keys(items).reduce((reduceResult, address: string) => {
    if (items[address]) {
      reduceResult[address] = items[address].name
    }

    return reduceResult
  }, {})
}

export function selectAllAddressNames(
  state: AppState,
  hasWalletName?: boolean = false,
): AddressNames {
  const addressNames: AddressNames = selectAddressNames(
    state,
    hasWalletName,
  )

  const favoritesAddressNames: AddressNames = selectFavoritesAddressNames(state)
  const singleAddressWalletsNames: AddressNames = selectSingleAddressWalletsNames(state)

  return {
    ...favoritesAddressNames,
    ...addressNames,
    ...singleAddressWalletsNames,
  }
}
