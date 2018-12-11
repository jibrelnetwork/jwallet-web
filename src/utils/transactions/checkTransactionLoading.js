// @flow

function checkTransactionLoading(
  data: ?TransactionData,
  blockData: ?TransactionBlockData,
  receiptData: ?TransactionReceiptData,
): boolean {
  return !(data && blockData && receiptData)
}

export default checkTransactionLoading
