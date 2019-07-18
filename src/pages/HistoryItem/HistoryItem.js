// @flow strict

import { connect } from 'react-redux'

import { PageNotFoundError } from 'errors'
import { transactionsIndex } from 'store/utils/HistoryItem/HistoryItem'

import {
  type Props,
  HistoryItemView,
} from './HistoryItemView'

type OwnProps = {|
  +itemId: TransactionId,
|}

function mapStateToProps(state: AppState, { itemId }: OwnProps) {
  const hasTransaction = transactionsIndex(state)[itemId] !== undefined

  if (!hasTransaction) {
    throw new PageNotFoundError()
  }

  return { itemId }
}

export const HistoryItem =
  connect< Props, OwnProps, _, _, _, _ >(mapStateToProps)(HistoryItemView)
