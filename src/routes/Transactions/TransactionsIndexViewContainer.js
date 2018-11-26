// @flow

import { connect } from 'react-redux'

import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { selectDigitalAssetsItems } from 'store/selectors/digitalAssets'

import {
  filterTransactions,
  searchTransactions,
  flattenTransactionsByOwner,
} from 'utils/transactions'

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

  return found
}

function mapStateToProps(state: AppState) {
  const networkId: NetworkId = selectCurrentNetworkId(state)
  const owner: ?OwnerAddress = selectActiveWalletAddress(state)
  const digitalAssets: DigitalAssets = selectDigitalAssetsItems(state)

  const {
    searchQuery,
    isOnlyPending,
  }: TransactionsState = selectTransactions(state)

  const transactionsByOwner: ?TransactionsByOwner = owner
    ? selectTransactionsByOwner(state, networkId, owner)
    : null

  return {
    digitalAssets,
    searchQuery,
    isOnlyPending,
    transactions: prepareTransactions(transactionsByOwner, searchQuery, isOnlyPending),
  }
}

const mapDispatchToProps = {
  setIsOnlyPending,
  changeSearchInput,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(TransactionsIndexView)
