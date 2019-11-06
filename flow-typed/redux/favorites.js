// @flow strict

declare type FavoriteAddress = Address

declare type Favorite = {|
  +name?: string,
  +description?: string,
  +address: FavoriteAddress,
|}

declare type Favorites = {
  [FavoriteAddress]: ?Favorite,
}

declare type FavoritesPersistV1 = {|
  +items: Favorites,
|}

declare type FavoritesPersist = FavoritesPersistV1

declare type FavoritesState = {|
  +persist: FavoritesPersist,
|}
