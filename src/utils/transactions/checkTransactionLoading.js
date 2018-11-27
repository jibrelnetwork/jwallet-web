// @flow

function checkTransactionLoading({
  data,
  blockData,
  receiptData,
}: Transaction): boolean {
  return !!(data && blockData && receiptData)
}

export default checkTransactionLoading
