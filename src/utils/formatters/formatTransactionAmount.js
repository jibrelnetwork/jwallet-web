// @flow strict

import { formatAssetBalance } from 'utils/formatters'
import { type TransactionItem } from 'store/transactionsIndex'

export function formatTransactionAmount({
  asset,
  amount,
  type,
  status,
}: TransactionItem): string {
  const formatted = asset
    ? formatAssetBalance(asset.blockchainParams.address, amount, asset.blockchainParams.decimals)
    : amount
  const symbol = asset
    ? `\u202F${asset.symbol}`
    : ''
  const formattedAmount = `${formatted}${symbol}`

  return status === 'success' || status === 'pending'
    ? `${(type === 'in' ? '+' : '\u2212')}${formattedAmount}`
    : formattedAmount
}
