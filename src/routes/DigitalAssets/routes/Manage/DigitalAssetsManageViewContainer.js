// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
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
  selectDigitalAssetsItems,
  selectDigitalAssetsManageSearchQuery,
} from 'store/selectors/digitalAssets'

import DigitalAssetsManageView from './DigitalAssetsManageView'

import {
  openView,
  closeView,
  setSearchQuery,
} from './modules/digitalAssetsManage'

import {
  setAssetIsActive,
  deleteCustomAsset,
} from '../../modules/digitalAssets'

function sortDigitalAssets(items: DigitalAssetWithBalance[]): DigitalAssetWithBalance[] {
  // eslint-disable-next-line fp/no-mutating-methods
  return [...items].sort((
    first: DigitalAssetWithBalance,
    second: DigitalAssetWithBalance,
  ): number => compareDigitalAssetsByName(first.name, second.name, 'asc', first.isCustom))
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
  )

  const assetsWithBalance: DigitalAssetWithBalance[] = getDigitalAssetsWithBalance(
    flattenDigitalAssets(assets),
    assetsBalancesFiltered,
  )

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
  addAsset: () => push('/digital-assets/add-asset'),
  editAsset: (address: Address) => push(`/digital-assets/edit-asset/${address}`),
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsManageView)
