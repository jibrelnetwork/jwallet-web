// @flow

import flattenFavorites from 'utils/favorites/flattenFavorites'

export function selectFavorites(state: AppState): FavoritesState {
  return state.favorites
}

export function selectFavoritesPersist(state: AppState): FavoritesPersist {
  const favorites: FavoritesState = selectFavorites(state)

  return favorites.persist
}

export function selectFavoritesItems(state: AppState): Favorites {
  const favoritesPersist: FavoritesPersist = selectFavoritesPersist(state)

  return favoritesPersist.items
}

export function selectFavoritesUserItems(state: AppState): Favorite[] {
  const items: Favorites = selectFavoritesItems(state)

  return flattenFavorites(items).filter(({ isAddedByUser }: Favorite): boolean => !!isAddedByUser)
}

export function selectFavorite(state: AppState, address: OwnerAddress): ?Favorite {
  const favoritesItems: Favorites = selectFavoritesItems(state)

  return favoritesItems[address]
}

export function selectFavoritesFormFieldValues(state: AppState): FavoritesFormFields {
  const favorites: FavoritesState = selectFavorites(state)

  return favorites.formFieldValues
}

export function selectFavoritesFormFieldErrors(state: AppState): FavoritesFormFields {
  const favorites: FavoritesState = selectFavorites(state)

  return favorites.formFieldErrors
}
