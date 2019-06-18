// @flow strict

export function handleTransaction(tx) {
  return {
    ...tx,
    transactionID: tx.hash,
  }
}
