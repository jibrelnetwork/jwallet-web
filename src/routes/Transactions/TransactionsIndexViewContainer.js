// @flow

import { connect } from 'react-redux'

import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { selectDigitalAssetsItems } from 'store/selectors/digitalAssets'

import {
  sortTransactions,
  filterTransactions,
  searchTransactions,
  flattenTransactionsByOwner,
} from 'utils/transactions'

import {
  selectCurrentBlock,
  selectProcessingBlock,
} from 'store/selectors/blocks'

import {
  selectNetworkById,
  selectCurrentNetworkId,
} from 'store/selectors/networks'

import {
  selectTransactions,
  selectTransactionsByOwner,
} from 'store/selectors/transactions'

import {
  setIsOnlyPending,
  changeSearchInput,
} from 'routes/modules/transactions'

import TransactionsIndexView from './TransactionsIndexView'

function prepareTransactions(
  items: ?TransactionsByOwner,
  searchQuery: string,
  isOnlyPending: boolean,
): TransactionWithAssetAddress[] {
  if (!items) {
    return []
  }

  const flatten: TransactionWithAssetAddress[] = flattenTransactionsByOwner(items)
  const filtered: TransactionWithAssetAddress[] = filterTransactions(flatten, isOnlyPending)
  const found: TransactionWithAssetAddress[] = searchTransactions(filtered, searchQuery)
  const sorted: TransactionWithAssetAddress[] = sortTransactions(found)

  return sorted
}

function mapStateToProps(state: AppState) {
  const networkId: NetworkId = selectCurrentNetworkId(state)
  const network: ?Network = selectNetworkById(state, networkId)
  const ownerAddress: ?OwnerAddress = selectActiveWalletAddress(state)
  const digitalAssets: DigitalAssets = selectDigitalAssetsItems(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state, networkId)
  const processingBlock: ?BlockData = selectProcessingBlock(state, networkId)

  const {
    searchQuery,
    isOnlyPending,
  }: TransactionsState = selectTransactions(state)

  const transactionsByOwner: ?TransactionsByOwner = ownerAddress
    ? selectTransactionsByOwner(state, networkId, ownerAddress)
    : null

  const isCurrentBlockEmpty: boolean = !currentBlock
  const isLoading: boolean = !!(processingBlock && processingBlock.isTransactionsLoading)

  return {
    digitalAssets,
    network,
    searchQuery,
    ownerAddress,
    isOnlyPending,
    isLoading: isCurrentBlockEmpty || isLoading,
    transactions: isCurrentBlockEmpty
      ? []
      : prepareTransactions(transactionsByOwner, searchQuery, isOnlyPending),
  }
}

const mapDispatchToProps = {
  setIsOnlyPending,
  changeSearchInput,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(TransactionsIndexView)
