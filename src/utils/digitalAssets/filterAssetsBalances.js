// @flow

function filterAssetsBalances(
  assetBalances: ?Balances,
  txsByOwner: ?TransactionsByOwner,
  processingBlock: ?BlockData,
): ?Balances {
  if (!(assetBalances && processingBlock)) {
    return null
  }

  const assetAddresses: AssetAddress[] = Object.keys(assetBalances)

  return assetAddresses.reduce((
    result: Balances,
    assetAddress: AssetAddress,
  ): Balances => {
    if (!(txsByOwner && assetBalances)) {
      return result
    }

    const txsByAssetAddress: ?TransactionsByAssetAddress = txsByOwner[assetAddress]
    const isTxsEmpty: boolean = !(txsByAssetAddress && Object.keys(txsByAssetAddress).length)

    if (isTxsEmpty) {
      return result
    }

    return {
      ...result,
      [assetAddress]: assetBalances[assetAddress],
    }
  }, {})
}

export default filterAssetsBalances
