// @flow

function getActiveDigitalAssetsData({
  items,
  balances,
}: DigitalAssetsData): Array<DigitalAssetMainDataWithBalance> {
  const activeAssets: DigitalAssets = items.filter((item: DigitalAsset): boolean => item.isActive)

  return activeAssets.map(({
    address,
    symbol,
    name,
  }: DigitalAsset): DigitalAssetMainDataWithBalance => ({
    name,
    symbol,
    address,
    balance: balances[address],
  }))
}

export default getActiveDigitalAssetsData
