// @flow strict

import { connect } from 'react-redux'
import { memoize } from 'lodash-es'

import { transactionsIndex } from 'components/TransactionItemNew/transactionsIndex'

import { HistoryItemView } from './HistoryItemView'

type OwnProps = {
  itemId: TransactionId,
}

const memoizedIndex = memoize(transactionsIndex)

function mapStateToProps(state: AppState, { itemId }: OwnProps) {
  return memoizedIndex(state)[itemId]
}

export const HistoryItem =
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps)(HistoryItemView)
