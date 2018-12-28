// @flow

function flattenPendingTransactions(
  items: ?Transactions,
  assetAddress: AssetAddress,
): TransactionWithPrimaryKeys[] {
  if (!items) {
    return []
  }

  return Object.keys(items).reduce((
    result: TransactionWithPrimaryKeys[],
    id: TransactionId,
  ): TransactionWithPrimaryKeys[] => {
    const item: ?Transaction = items ? items[id] : null

    if (!item) {
      return result
    }

    return [
      ...result,
      {
        ...item,
        keys: {
          id,
          assetAddress,
          blockNumber: '0',
        },
      },
    ]
  }, [])
}

export default flattenPendingTransactions
