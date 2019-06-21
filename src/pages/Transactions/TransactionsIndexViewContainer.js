// @flow

import { connect } from 'react-redux'

import {
  selectCurrentBlock,
  selectProcessingBlock,
} from 'store/selectors/blocks'
import { transactionsIndex } from 'store/transactionsIndex'

import {
  selectCurrentNetworkId,
} from 'store/selectors/networks'

import TransactionsIndexView from './TransactionsIndexView'

function mapStateToProps(state: AppState) {
  const index = transactionsIndex(state)
  // Sorting transactions
  // eslint-disable-next-line fp/no-mutating-methods
  const transactions = Object.keys(index).map(id => index[id]).reverse()
  const networkId: NetworkId = selectCurrentNetworkId(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state, networkId)
  const processingBlock: ?BlockData = selectProcessingBlock(state, networkId)

  const isCurrentBlockEmpty: boolean = !currentBlock
  const isLoading: boolean = !!(processingBlock && processingBlock.isTransactionsLoading)

  return {
    isLoading: isCurrentBlockEmpty || isLoading,
    transactions,
  }
}

export default (
  connect< any, OwnPropsEmpty, _, _, _, _ >(mapStateToProps)
)(TransactionsIndexView)
