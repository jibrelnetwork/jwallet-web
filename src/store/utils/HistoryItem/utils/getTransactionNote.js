// @flow strict

import { selectCommentsItems } from 'store/selectors/comments'

export function getTransactionNote(
  state: AppState,
  transaction: TransactionWithPrimaryKeys,
): string {
  /**
   * comment by transaction id has greater priority than comment by transaction hash
   * this is actual only for contract events
   */
  const notes = selectCommentsItems(state)
  const { hash } = transaction
  const { id } = transaction.keys

  const noteKey = notes[id] ? id : hash

  return notes[noteKey] || ''
}
