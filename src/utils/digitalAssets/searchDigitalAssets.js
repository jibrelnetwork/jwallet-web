// @flow

function searchDigitalAssets(
  items: DigitalAssetWithBalance[],
  searchQuery: string,
): DigitalAssetWithBalance[] {
  const query: string = searchQuery.trim()
  const searchRe: RegExp = new RegExp(query, 'ig')

  return !query ? items : items.filter(({
    name,
    symbol,
    address,
  }: DigitalAssetWithBalance) => {
    if (
      (query.length < 2) ||
      (name.search(searchRe) !== -1) ||
      (symbol.search(searchRe) !== -1) ||
      (address.search(searchRe) !== -1)
    ) {
      return true
    }

    return false
  })
}

export default searchDigitalAssets
