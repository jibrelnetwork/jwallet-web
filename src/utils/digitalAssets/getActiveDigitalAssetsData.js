// @flow

const getActiveDigitalAssetsData = ({ items, balances }: DigitalAssetsData): Array<Object> => {
  const activeAssets: DigitalAssets = items.filter((item: DigitalAsset): boolean => item.isActive)

  return activeAssets.map(({ address, symbol, name }: DigitalAsset): Object => ({
    name,
    symbol,
    address,
    balance: balances[address],
  }))
}

export default getActiveDigitalAssetsData
