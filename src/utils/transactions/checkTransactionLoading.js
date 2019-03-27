// @flow

type CheckTransactionLoadingItem = Transaction | TransactionWithPrimaryKeys

function checkTransactionLoading<T: CheckTransactionLoadingItem>(item: T): boolean {
  const {
    data,
    blockData,
    receiptData,
  }: T = item

  return !(data && blockData && receiptData)
}

export default checkTransactionLoading
