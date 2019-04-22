// @flow

import { connect } from 'react-redux'

import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectBalancesByBlockNumber } from 'store/selectors/balances'
import { selectTransactionsByOwner } from 'store/selectors/transactions'

import {
  selectCurrentBlock,
  selectProcessingBlock,
} from 'store/selectors/blocks'

import {
  searchDigitalAssets,
  filterAssetsBalances,
  flattenDigitalAssets,
  compareDigitalAssetsByName,
  getDigitalAssetsWithBalance,
} from 'utils/digitalAssets'

import {
  selectActiveWalletOrThrow,
  selectActiveWalletAddress,
} from 'store/selectors/wallets'

import {
  selectDigitalAssetsItems,
  selectDigitalAssetsManageSearchQuery,
} from 'store/selectors/digitalAssets'

import {
  openView,
  closeView,
  setSearchQuery,
} from 'store/modules/digitalAssetsManage'

import {
  setAssetIsActive,
  deleteCustomAsset,
} from 'store/modules/digitalAssets'

import DigitalAssetsManageView from './DigitalAssetsManageView'

function sortDigitalAssets(items: DigitalAssetWithBalance[]): DigitalAssetWithBalance[] {
  // eslint-disable-next-line fp/no-mutating-methods
  return [...items].sort((
    first: DigitalAssetWithBalance,
    second: DigitalAssetWithBalance,
  ): number => compareDigitalAssetsByName(
    first.name.toLowerCase(),
    second.name.toLowerCase(),
    'asc',
    first.isCustom,
    second.isCustom,
  ))
}

function prepareDigitalAssets(
  items: DigitalAssetWithBalance[],
  searchQuery: string,
): DigitalAssetWithBalance[] {
  const itemsFound: DigitalAssetWithBalance[] = searchDigitalAssets(
    items,
    searchQuery,
  )

  return sortDigitalAssets(itemsFound)
}

const mapStateToProps = (state: AppState) => {
  const wallet: Wallet = selectActiveWalletOrThrow(state)

  const networkId: NetworkId = selectCurrentNetworkId(state)
  const ownerAddress: ?OwnerAddress = selectActiveWalletAddress(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state, networkId)
  const searchQuery: string = selectDigitalAssetsManageSearchQuery(state)
  const processingBlock: ?BlockData = selectProcessingBlock(state, networkId)
  const assets: DigitalAssets = selectDigitalAssetsItems(state /* , networkId */)
  const txs: ?TransactionsByOwner = selectTransactionsByOwner(state, networkId, ownerAddress)

  const assetsBalances: ?Balances = selectBalancesByBlockNumber(
    state,
    networkId,
    ownerAddress,
    currentBlock ? currentBlock.number.toString() : null,
  )

  /**
   * filterAssetsBalances is necessary to make sure that app displays
   * consistent state of balance+transactions by specific digital asset
   */
  const assetsBalancesFiltered: ?Balances = filterAssetsBalances(
    assetsBalances,
    txs,
    assets,
    processingBlock,
    wallet.createdBlockNumber && wallet.createdBlockNumber.mainnet,
  )

  const assetsWithBalance: DigitalAssetWithBalance[] = getDigitalAssetsWithBalance(
    flattenDigitalAssets(assets),
    assetsBalancesFiltered,
  )

  console.log('itemsFound itemsFound itemsFound itemsFound', assetsWithBalance)

  return {
    items: prepareDigitalAssets(assetsWithBalance, searchQuery),
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  setSearchQuery,
  setAssetIsActive,
  deleteCustomAsset,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsManageView)
