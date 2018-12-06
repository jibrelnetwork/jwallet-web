// @flow

function flattenTransactions(
  items: Transactions,
  assetAddress: AssetAddress,
): TransactionWithAssetAddress[] {
  return Object.keys(items).reduce((result: TransactionWithAssetAddress[], hash: Hash) => {
    const transaction: ?Transaction = items[hash]

    if (!transaction) {
      return result
    }

    return [
      ...result,
      {
        assetAddress,
        ...transaction,
      },
    ]
  }, [])
}

export default flattenTransactions
