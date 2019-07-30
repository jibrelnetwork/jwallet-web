// @flow

import { connect } from 'react-redux'

import { selectCurrentBlock } from 'store/selectors/blocks'
import { selectCommentsItems } from 'store/selectors/comments'
import { selectBalancesByBlockNumber } from 'store/selectors/balances'
import { selectFavoritesAddressNames } from 'store/selectors/favorites'
import {
  selectDigitalAssetsItems,
  selectDigitalAssetOrThrow,
} from 'store/selectors/digitalAssets'

import {
  selectNetworkById,
  selectCurrentNetworkId,
} from 'store/selectors/networks'

import {
  selectActiveWalletOrThrow,
  selectAddressNames,
  selectActiveWalletAddress,
  selectAddressWalletsNames,
} from 'store/selectors/wallets'

import {
  selectTransactions,
  selectTransactionsByAsset,
  selectPendingTransactionsByAsset,
} from 'store/selectors/transactions'

import {
  prepareListForRendering,
  flattenTransactionsByAsset,
  flattenPendingTransactions,
  checkTransactionsByAssetLoading,
} from 'utils/transactions'

import {
  setPendingFilter,
  changeSearchInput,
  removeItemsByAsset,
} from 'store/modules/transactions'

import { edit as editComment } from 'store/modules/comments'
import { remove as removeFavorite } from 'store/modules/favorites'

import AssetsItemView from './AssetsItemView'

type OwnProps = {|
  +params: {|
    +asset: string,
  |},
|}

function mapStateToProps(state: AppState, ownProps: OwnProps) {
  const wallet: Wallet = selectActiveWalletOrThrow(state)

  const assetAddress: string = ownProps.params.asset
  const comments: Comments = selectCommentsItems(state)
  const networkId: NetworkId = selectCurrentNetworkId(state)
  const addressNames: AddressNames = selectAddressNames(state)
  const network: ?Network = selectNetworkById(state, networkId)
  const favorites: AddressNames = selectFavoritesAddressNames(state)
  const ownerAddress: ?OwnerAddress = selectActiveWalletAddress(state)
  const digitalAssets: DigitalAssets = selectDigitalAssetsItems(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state, networkId)
  const addressWalletsNames: AddressNames = selectAddressWalletsNames(state)

  const assetsBalances: ?Balances = !ownerAddress ? null : selectBalancesByBlockNumber(
    state,
    networkId,
    ownerAddress,
    currentBlock ? currentBlock.number.toString() : null,
  )

  const assetBalance: ?Balance = assetsBalances ? assetsBalances[assetAddress] : null

  const {
    searchQuery,
    isPendingFiltered,
  }: TransactionsState = selectTransactions(state)

  const items: ?TransactionsByAssetAddress = selectTransactionsByAsset(
    state,
    assetAddress,
  )

  const pending: ?Transactions = selectPendingTransactionsByAsset(
    state,
    assetAddress,
  )

  const isCurrentBlockEmpty: boolean = !currentBlock
  const digitalAsset: DigitalAsset = selectDigitalAssetOrThrow(state, assetAddress)

  const { deploymentBlockNumber }: DigitalAssetBlockchainParams = digitalAsset.blockchainParams
  const createdBlockNumber: ?number = wallet.createdBlockNumber && wallet.createdBlockNumber.mainnet
  const minBlock: ?number = createdBlockNumber || deploymentBlockNumber

  const isLoading: boolean = checkTransactionsByAssetLoading(items, minBlock)

  const flatten: TransactionWithPrimaryKeys[] = flattenTransactionsByAsset(items, assetAddress)
  const flattenPen: TransactionWithPrimaryKeys[] = flattenPendingTransactions(pending, assetAddress)

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
    assetBalance,
    assetAddress,
    ownerAddress,
    isLoading,
    isPendingFiltered,
    isCurrentBlockEmpty,
    transactions: isCurrentBlockEmpty ? [] : prepareListForRendering(
      [...flatten, ...flattenPen],
      comments,
      {
        ...favorites,
        ...addressNames,
        ...addressWalletsNames,
      },
      searchQuery,
      { isPendingFiltered },
    ),
  }
}

const mapDispatchToProps = {
  editComment,
  removeFavorite,
  setPendingFilter,
  changeSearchInput,
  removeItemsByAsset,
}

export const AssetsItem = (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(AssetsItemView)
