// @flow strict

import { formatAssetBalance } from 'utils/formatters'
import {
  type TransactionState,
  TRANSFER_IN_TYPE,
  TRANSFER_OUT_TYPE,
} from 'store/utils/HistoryItem/types'

type TransferInternal = {
  +asset: DigitalAsset,
  +amount: string,
  +type: typeof TRANSFER_IN_TYPE | typeof TRANSFER_OUT_TYPE,
  +status: TransactionState,
}

export function formatTransactionAmount({
  asset,
  amount,
  type,
  status,
}: TransferInternal): string {
  const formatted = asset
    ? formatAssetBalance(asset.blockchainParams.address, amount, asset.blockchainParams.decimals)
    : amount
  const symbol = asset
    ? `\u2007${asset.symbol}`
    : ''
  const formattedAmount = `${formatted}${symbol}`

  return status === 'success' || status === 'pending'
    ? `${(type === TRANSFER_IN_TYPE ? '+' : '\u2212')}${formattedAmount}`
    : formattedAmount
}
