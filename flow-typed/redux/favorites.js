// @flow

declare type FavoriteAddress = Address

declare type Favorite = {|
  +name?: string,
  +description?: string,
  +address: FavoriteAddress,
|}

declare type Favorites = {
  [FavoriteAddress]: ?Favorite,
}

declare type FavoritesPersist = {|
  +items: Favorites,
|}

declare type FavoritesState = {|
  +persist: FavoritesPersist,
|}
