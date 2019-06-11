// @flow strict

import { selectActiveWalletAddressOrThrow } from 'store/selectors/wallets'

import {
  TRANSFER_IN_TYPE,
  TRANSFER_OUT_TYPE,
  TRANSFER_CANCEL_TYPE,
  CONTRACT_CALL_TYPE,
  type HistoryItemsTypes,
} from 'store/utils/HistoryItem/types'

export function setHistoryItemType(
  state: AppState,
  transaction: TransactionWithPrimaryKeys,
): ?HistoryItemsTypes {
  const currentAddress = selectActiveWalletAddressOrThrow(state)

  // eslint-disable-next-line fp/no-let
  let type = null

  /* eslint-disable fp/no-mutation */
  if (transaction.to === currentAddress) {
    type = TRANSFER_IN_TYPE
  }

  if (transaction.from === currentAddress) {
    type = TRANSFER_OUT_TYPE
  }

  if (transaction.isCanceled) {
    type = TRANSFER_CANCEL_TYPE
  }

  if (transaction.contractAddress) {
    type = CONTRACT_CALL_TYPE
  }

  /* eslint-enable fp/no-mutation */
  return type
}
