// @flow strict

import { get } from 'lodash-es'
import { getTxFee } from 'utils/transactions'

export function getTransactionFee(
  transaction: TransactionWithPrimaryKeys,
  asset: DigitalAsset,
): string {
  const gasUsed = get(transaction, 'receiptData.gasUsed', 0)
  const gasPrice = get(transaction, 'data.gasPrice', 0)
  const decimals = get(asset, 'blockchainParams.decimals', 18)

  return getTxFee(gasUsed, gasPrice, decimals)
}

