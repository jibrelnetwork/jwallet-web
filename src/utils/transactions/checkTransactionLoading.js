// @flow

function checkTransactionLoading<T: Transaction | TransactionWithPrimaryKeys>(item: T): boolean {
  const {
    data,
    blockData,
    receiptData,
  }: T = item

  return !(data && blockData && receiptData)
}

export default checkTransactionLoading
