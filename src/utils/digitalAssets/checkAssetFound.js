// @flow

function checkAssetFound(
  name: string,
  symbol: string,
  address: AssetAddress,
  searchQuery: string,
): boolean {
  const query: string = searchQuery.trim().toUpperCase()

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
}

export default checkAssetFound
