// @flow

function searchDigitalAssets(
  items: DigitalAssetWithBalance[],
  searchQuery: string,
): DigitalAssetWithBalance[] {
  const query: string = searchQuery.trim().toUpperCase()

  if (!query) {
    return items
  }

  return items.filter(({
    name,
    symbol,
    address,
  }: DigitalAssetWithBalance) => {
    if (
      (query.length < 2) ||
      (symbol.toUpperCase().indexOf(query) !== -1) ||
      (name.toUpperCase().indexOf(query) !== -1) ||
      (address.toUpperCase() === query) ||
      (address.substr(2).toUpperCase() === query)
    ) {
      return true
    }

    return false
  })
}

export default searchDigitalAssets
