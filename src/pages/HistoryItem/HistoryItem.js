// @flow strict

import { connect } from 'react-redux'

import { HistoryItemView } from './HistoryItemView'

type OwnProps = {
  itemId: TransactionId,
}

function mapStateToProps(state: AppState, { itemId }: OwnProps) {
  return { itemId }
}

export const HistoryItem =
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps)(HistoryItemView)
