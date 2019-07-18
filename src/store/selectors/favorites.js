// @flow

import {
  selectAddressNames,
  selectAddressWalletsNames,
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

export function selectAllAddressNames(state: AppState): AddressNames {
  const addressNames: AddressNames = selectAddressNames(state)
  const addressWalletsNames: AddressNames = selectAddressWalletsNames(state)
  const favoritesAddressNames: AddressNames = selectFavoritesAddressNames(state)

  return {
    ...addressNames,
    ...addressWalletsNames,
    ...favoritesAddressNames,
  }
}
