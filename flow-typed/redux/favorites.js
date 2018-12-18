// @flow

declare type FavoriteAddress = Address

declare type Favorite = {|
  +name?: string,
  +address: string,
  +description?: string,
  +isAddedByUser?: boolean,
|}

declare type Favorites = {
  [FavoriteAddress]: ?Favorite,
}

declare type FavoritesFormFields = {|
  +name: string,
  +address: string,
  +description: string,
|}

declare type FavoritesPersist = {|
  +items: Favorites,
|}

declare type FavoritesState = {|
  +persist: FavoritesPersist,
  +formFieldValues: FavoritesFormFields,
  +formFieldErrors: FavoritesFormFields,
  +isLoading: boolean,
|}
