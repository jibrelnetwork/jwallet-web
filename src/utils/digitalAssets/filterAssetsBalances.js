// @flow

import flattenTransactionsByAsset from 'utils/transactions/flattenTransactionsByAsset'

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

    const txs: TransactionWithPrimaryKeys[] = !txsByAsset
      ? []
      : flattenTransactionsByAsset(txsByAsset, assetAddress)

    const isTxsEmpty: boolean = !txs.length

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
