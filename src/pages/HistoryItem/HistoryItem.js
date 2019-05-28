// @flow strict

import { connect } from 'react-redux'
import { memoize } from 'lodash-es'

import { PageNotFoundError } from 'errors'
import { transactionsIndex } from 'components/TransactionItemNew/transactionsIndex'

import {
  type Props,
  HistoryItemView,
} from './HistoryItemView'

type OwnProps = {|
  +itemId: TransactionId,
|}

function mapStateToProps(state: AppState, { itemId }: OwnProps) {
  const hasTransaction = memoize(transactionsIndex)(state)[itemId] !== undefined

  if (!hasTransaction) {
    throw new PageNotFoundError()
  }

  return { itemId }
}

export const HistoryItem =
  connect< Props, OwnProps, _, _, _, _ >(mapStateToProps)(HistoryItemView)
