// @flow

declare type Favorite = {|
  +name?: string,
  +address: string,
  +comment?: string,
  +isAddedByUser?: boolean,
|}

declare type Favorites = {
  [OwnerAddress]: ?Favorite,
}

declare type FavoritesFormFields = {|
  +name: string,
  +address: string,
  +comment: string,
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
