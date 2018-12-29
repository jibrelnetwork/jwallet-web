// @flow

import {
  flattenTransactionsByAsset,
  checkTransactionsByAssetLoading,
} from 'utils/transactions'

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

    const txsByAsset: ?TransactionsByAssetAddress = txsByOwner[assetAddress]

    const fetchedTxs: TransactionWithPrimaryKeys[] =
      flattenTransactionsByAsset(txsByAsset, assetAddress)

    const isFetchedEmpty: boolean = !fetchedTxs.length
    const isLoading: boolean = checkTransactionsByAssetLoading(txsByAsset)

    if (isFetchedEmpty && isLoading) {
      return result
    }

    return {
      ...result,
      [assetAddress]: assetBalances[assetAddress],
    }
  }, {})
}

export default filterAssetsBalances
