// @flow

function filterFoundDigitalAssets(
  items: DigitalAssets,
  foundAssets: Addresses,
  searchQuery: string,
): DigitalAssets {
  if (!searchQuery) {
    return items
  }

  return items.filter(({ address }: DigitalAsset): boolean => foundAssets.includes(address))
}

export default filterFoundDigitalAssets
