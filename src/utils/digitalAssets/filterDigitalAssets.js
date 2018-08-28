// @flow

function checkBalance(address: Address, balances: Balances): boolean {
  return (balances[address] > 0)
}

function checkPopular({ address, isCustom }: DigitalAsset, balances: Balances): boolean {
  return (!checkBalance(address, balances) && !isCustom)
}

function filterDigitalAssets(
  items: DigitalAssets,
  balances: Balances,
  type: DigitalAssetsListType,
): DigitalAssets {
  switch (type) {
    case 'balance':
      return items.filter(({ address }: DigitalAsset): boolean => checkBalance(address, balances))

    case 'popular':
      return items.filter((asset: DigitalAsset): boolean => checkPopular(asset, balances))

    case 'custom':
      return items.filter(({ isCustom }: DigitalAsset): boolean => isCustom)

    default:
      return items
  }
}

export default filterDigitalAssets
