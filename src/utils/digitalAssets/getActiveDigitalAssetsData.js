// @flow

export default function getActiveDigitalAssetsData({
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
