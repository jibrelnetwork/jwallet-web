// @flow

import { connect } from 'react-redux'

import { selectCommentsItems } from 'store/selectors/comments'
import { selectFavoritesAddressNames } from 'store/selectors/favorites'
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
  selectAddressNames,
  selectActiveWalletAddress,
  selectAddressWalletsNames,
} from 'store/selectors/wallets'

import {
  selectTransactions,
  selectTransactionsByOwner,
  selectPendingTransactionsByOwner,
} from 'store/selectors/transactions'

import {
  setIsOnlyPending,
  changeSearchInput,
} from 'routes/modules/transactions'

import { edit as editComment } from 'routes/modules/comments'
import { remove as removeFavorite } from 'routes/Favorites/modules/favorites'

import TransactionsIndexView from './TransactionsIndexView'

function prepareTransactions(
  items: ?TransactionsByOwner,
  pending: ?PendingTransactionsByOwner,
  names: AddressNames,
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
  const found: TransactionWithPrimaryKeys[] = searchTransactions(filtered, searchQuery, names)
  const sorted: TransactionWithPrimaryKeys[] = sortTransactions(found)

  return sorted
}

function mapStateToProps(state: AppState) {
  const comments: Comments = selectCommentsItems(state)
  const networkId: NetworkId = selectCurrentNetworkId(state)
  const addressNames: AddressNames = selectAddressNames(state)
  const network: ?Network = selectNetworkById(state, networkId)
  const favorites: AddressNames = selectFavoritesAddressNames(state)
  const ownerAddress: ?OwnerAddress = selectActiveWalletAddress(state)
  const digitalAssets: DigitalAssets = selectDigitalAssetsItems(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state, networkId)
  const addressWalletsNames: AddressNames = selectAddressWalletsNames(state)
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
    comments,
    favorites,
    addressNames: {
      ...addressNames,
      ...addressWalletsNames,
    },
    digitalAssets,
    searchQuery,
    ownerAddress,
    isOnlyPending,
    isLoading: isCurrentBlockEmpty || isLoading,
    transactions: isCurrentBlockEmpty
      ? []
      : prepareTransactions(
        transactionsByOwner,
        pendingTransactions,
        {
          ...favorites,
          ...addressNames,
          ...addressWalletsNames,
        },
        searchQuery,
        isOnlyPending
      ),
  }
}

const mapDispatchToProps = {
  editComment,
  removeFavorite,
  setIsOnlyPending,
  changeSearchInput,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(TransactionsIndexView)
