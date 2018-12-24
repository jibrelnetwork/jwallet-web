// @flow

function getDigitalAssetsWithBalance(
  digitalAssets: DigitalAsset[],
  balances: ?Balances,
): DigitalAssetWithBalance[] {
  return digitalAssets.map((item: DigitalAsset): DigitalAssetWithBalance => ({
    ...item,
    balance: balances ? balances[item.address] : null,
  }))
}

export default getDigitalAssetsWithBalance
