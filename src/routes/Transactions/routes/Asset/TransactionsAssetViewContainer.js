// @flow

import { connect } from 'react-redux'

import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { selectDigitalAssetsItems } from 'store/selectors/digitalAssets'

import {
  selectTransactions,
  selectTransactionsByAsset,
} from 'store/selectors/transactions'

import {
  filterTransactions,
  searchTransactions,
  flattenTransactionsByAsset,
} from 'utils/transactions'

import {
  setIsOnlyPending,
  changeSearchInput,
} from 'routes/modules/transactions'

import TransactionsAssetView from './TransactionsAssetView'

type OwnProps = {|
  +params: {|
    +asset: string,
  |},
|}

function prepareTransactions(
  items: ?Transactions,
  assetAddress: string,
  searchQuery: string,
  isOnlyPending: boolean,
): TransactionWithAssetAddress[] {
  if (!items) {
    return []
  }

  const flatten: TransactionWithAssetAddress[] = flattenTransactionsByAsset(items, assetAddress)
  const filtered: TransactionWithAssetAddress[] = filterTransactions(flatten, isOnlyPending)
  const found: TransactionWithAssetAddress[] = searchTransactions(filtered, searchQuery)

  return found
}

function mapStateToProps(state: AppState, ownProps: OwnProps) {
  const assetAddress: string = ownProps.params.asset
  const networkId: NetworkId = selectCurrentNetworkId(state)
  const ownerAddress: ?OwnerAddress = selectActiveWalletAddress(state)
  const digitalAssets: DigitalAssets = selectDigitalAssetsItems(state)

  const {
    searchQuery,
    isOnlyPending,
  }: TransactionsState = selectTransactions(state)

  const transactionsByAsset: ?Transactions = ownerAddress
    ? selectTransactionsByAsset(state, networkId, ownerAddress, assetAddress)
    : null

  return {
    digitalAssets,
    searchQuery,
    assetAddress,
    ownerAddress,
    isOnlyPending,
    transactions: prepareTransactions(
      transactionsByAsset,
      assetAddress,
      searchQuery,
      isOnlyPending,
    ),
  }
}

const mapDispatchToProps = {
  setIsOnlyPending,
  changeSearchInput,
}

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(TransactionsAssetView)
