// @flow

import flattenDigitalAssets from './flattenDigitalAssets'

function getDigitalAssetsWithBalance(
  digitalAssets: DigitalAssets,
  balances: ?Balances,
): DigitalAssetWithBalance[] {
  return flattenDigitalAssets(digitalAssets)
    .map((item: DigitalAsset): DigitalAssetWithBalance => ({
      ...item,
      balance: balances ? balances[item.address] : null,
    }))
}

export default getDigitalAssetsWithBalance
