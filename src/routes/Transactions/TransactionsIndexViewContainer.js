// @flow

import { connect } from 'react-redux'

import { selectAllAddressNames } from 'store/selectors/favorites'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { selectDigitalAssetsItems } from 'store/selectors/digitalAssets'

import {
  removeDuplicates,
  sortTransactions,
  filterTransactions,
  searchTransactions,
  flattenTransactionsByOwner,
  flattenPendingTransactionsByOwner,
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
  selectPendingTransactionsByOwner,
} from 'store/selectors/transactions'

import {
  setIsOnlyPending,
  changeSearchInput,
} from 'routes/modules/transactions'

import TransactionsIndexView from './TransactionsIndexView'

function prepareTransactions(
  items: ?TransactionsByOwner,
  pending: ?PendingTransactionsByOwner,
  searchQuery: string,
  isOnlyPending: boolean,
): TransactionWithPrimaryKeys[] {
  if (!items) {
    return []
  }

  const flatten: TransactionWithPrimaryKeys[] = flattenTransactionsByOwner(items)
  const flattenPending: TransactionWithPrimaryKeys[] = flattenPendingTransactionsByOwner(pending)
  const merged: TransactionWithPrimaryKeys[] = [...flatten, ...flattenPending]
  const cleaned: TransactionWithPrimaryKeys[] = removeDuplicates(merged)
  const filtered: TransactionWithPrimaryKeys[] = filterTransactions(cleaned, isOnlyPending)
  const found: TransactionWithPrimaryKeys[] = searchTransactions(filtered, searchQuery)
  const sorted: TransactionWithPrimaryKeys[] = sortTransactions(found)

  return sorted
}

function mapStateToProps(state: AppState) {
  const networkId: NetworkId = selectCurrentNetworkId(state)
  const network: ?Network = selectNetworkById(state, networkId)
  const addressNames: AddressNames = selectAllAddressNames(state)
  const ownerAddress: ?OwnerAddress = selectActiveWalletAddress(state)
  const digitalAssets: DigitalAssets = selectDigitalAssetsItems(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state, networkId)
  const processingBlock: ?BlockData = selectProcessingBlock(state, networkId)

  const {
    searchQuery,
    isOnlyPending,
  }: TransactionsState = selectTransactions(state)

  const transactionsByOwner: ?TransactionsByOwner =
    selectTransactionsByOwner(state, networkId, ownerAddress)

  const pendingTransactions: ?PendingTransactionsByOwner =
    selectPendingTransactionsByOwner(state, networkId, ownerAddress)

  const isCurrentBlockEmpty: boolean = !currentBlock
  const isLoading: boolean = !!(processingBlock && processingBlock.isTransactionsLoading)

  return {
    network,
    addressNames,
    digitalAssets,
    searchQuery,
    ownerAddress,
    isOnlyPending,
    isLoading: isCurrentBlockEmpty || isLoading,
    transactions: isCurrentBlockEmpty
      ? []
      : prepareTransactions(transactionsByOwner, pendingTransactions, searchQuery, isOnlyPending),
  }
}

const mapDispatchToProps = {
  setIsOnlyPending,
  changeSearchInput,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(TransactionsIndexView)
