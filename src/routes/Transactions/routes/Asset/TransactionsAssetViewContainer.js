// @flow

import { connect } from 'react-redux'

import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { selectBalancesByOwnerAddress } from 'store/selectors/balances'
import { selectDigitalAssetsItems } from 'store/selectors/digitalAssets'

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
  selectTransactionsByAsset,
} from 'store/selectors/transactions'

import {
  sortTransactions,
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
  items: ?TransactionsByAssetAddress,
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
  const sorted: TransactionWithAssetAddress[] = sortTransactions(found)

  return sorted
}

function mapStateToProps(state: AppState, ownProps: OwnProps) {
  const assetAddress: string = ownProps.params.asset
  const networkId: NetworkId = selectCurrentNetworkId(state)
  const network: ?Network = selectNetworkById(state, networkId)
  const ownerAddress: ?OwnerAddress = selectActiveWalletAddress(state)
  const digitalAssets: DigitalAssets = selectDigitalAssetsItems(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state, networkId)
  const currentBlockNumber: number = currentBlock ? currentBlock.number : 0
  const processingBlock: ?BlockData = selectProcessingBlock(state, networkId)

  const assetsBalances: ?Balances = !ownerAddress ? null : selectBalancesByOwnerAddress(
    state,
    networkId,
    currentBlockNumber,
    ownerAddress,
  )

  const assetBalance: ?Balance = assetsBalances ? assetsBalances[assetAddress] : null

  const {
    searchQuery,
    isOnlyPending,
  }: TransactionsState = selectTransactions(state)

  const transactionsByAsset: ?TransactionsByAssetAddress = ownerAddress
    ? selectTransactionsByAsset(state, networkId, ownerAddress, assetAddress)
    : null

  const isCurrentBlockEmpty: boolean = !currentBlock
  const isLoading: boolean = !!(processingBlock && processingBlock.isTransactionsLoading)

  return {
    digitalAssets,
    network,
    searchQuery,
    assetBalance,
    ownerAddress,
    isLoading,
    isOnlyPending,
    isCurrentBlockEmpty,
    transactions: isCurrentBlockEmpty ? [] : prepareTransactions(
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
