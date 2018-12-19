// @flow

function flattenFavorites(items: Favorites): Favorite[] {
  return Object.keys(items).reduce((result: Favorite[], address: OwnerAddress) => {
    const favorite: ?Favorite = items[address]

    if (!favorite) {
      return result
    }

    return [
      ...result,
      favorite,
    ]
  }, [])
}

export default flattenFavorites
