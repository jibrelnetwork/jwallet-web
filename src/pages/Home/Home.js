// @flow

import { connect } from 'react-redux'

import isZero from 'utils/numbers/isZero'
import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectBalancesByBlockNumber } from 'store/selectors/balances'
import { selectTransactionsByOwner } from 'store/selectors/transactions'

import {
  selectActiveWallet,
  selectActiveWalletAddress,
} from 'store/selectors/wallets'

import {
  selectDigitalAssetsItems,
  selectDigitalAssetsGridFilters,
  selectDigitalAssetsGridSearchQuery,
} from 'store/selectors/digitalAssets'

import {
  searchDigitalAssets,
  filterAssetsBalances,
  flattenDigitalAssets,
  compareDigitalAssetsByName,
  getDigitalAssetsWithBalance,
  compareDigitalAssetsByBalance,
} from 'utils/digitalAssets'

import {
  selectCurrentBlock,
  selectProcessingBlock,
} from 'store/selectors/blocks'

import {
  openView,
  closeView,
} from 'store/modules/digitalAssetsGrid'

import { HomeView } from './HomeView'

function filterActiveDigitalAssets(items: DigitalAssetWithBalance[]): DigitalAssetWithBalance[] {
  return items.filter(({ isActive }: DigitalAssetWithBalance) => !!isActive)
}

function filterZeroBalanceDigitalAssets(
  items: DigitalAssetWithBalance[],
  isHideZeroBalance: boolean,
): DigitalAssetWithBalance[] {
  if (!isHideZeroBalance) {
    return items
  }

  return items
    .filter(({ balance }: DigitalAssetWithBalance): boolean => !!balance && !isZero(balance.value))
}

function sortDigitalAssets(
  items: DigitalAssetWithBalance[],
  filterOptions: DigitalAssetsFilterOptions,
): DigitalAssetWithBalance[] {
  const {
    sortBy,
    sortByNameDirection,
    sortByBalanceDirection,
  }: DigitalAssetsFilterOptions = filterOptions

  // eslint-disable-next-line fp/no-mutating-methods
  const itemsSortedByName: DigitalAssetWithBalance[] = [...items].sort((
    first: DigitalAssetWithBalance,
    second: DigitalAssetWithBalance,
  ): number => compareDigitalAssetsByName(first.name, second.name, sortByNameDirection))

  if (sortBy === 'balance') {
    // eslint-disable-next-line fp/no-mutating-methods
    return [...itemsSortedByName].sort((
      first: DigitalAssetWithBalance,
      second: DigitalAssetWithBalance,
    ): number => compareDigitalAssetsByBalance(
      first,
      second,
      sortByBalanceDirection,
    ))
  }

  return itemsSortedByName
}

function prepareDigitalAssets(
  items: DigitalAssetWithBalance[],
  filterOptions: DigitalAssetsFilterOptions,
  searchQuery: string,
): DigitalAssetWithBalance[] {
  const itemsActive: DigitalAssetWithBalance[] = filterActiveDigitalAssets(items)

  const itemsFiltered: DigitalAssetWithBalance[] = filterZeroBalanceDigitalAssets(
    itemsActive,
    filterOptions.isHideZeroBalance,
  )

  const itemsFound: DigitalAssetWithBalance[] = searchDigitalAssets(
    itemsFiltered,
    searchQuery,
  )

  const itemsSorted: DigitalAssetWithBalance[] = sortDigitalAssets(
    itemsFound,
    filterOptions,
  )

  return itemsSorted
}

function mapStateToProps(state: AppState) {
  const wallet: ?Wallet = selectActiveWallet(state)

  if (!wallet) {
    return {
      filterOptions: {
        sortBy: 'name',
        sortByNameDirection: 'asc',
        sortByBalanceDirection: 'asc',
        isHideZeroBalance: false,
      },
      items: [],
    }
  }

  const networkId: NetworkId = selectCurrentNetworkId(state)
  const ownerAddress: ?OwnerAddress = selectActiveWalletAddress(state)
  const searchQuery: string = selectDigitalAssetsGridSearchQuery(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state, networkId)
  const processingBlock: ?BlockData = selectProcessingBlock(state, networkId)
  const assets: DigitalAssets = selectDigitalAssetsItems(state /* , networkId */)
  const filterOptions: DigitalAssetsFilterOptions = selectDigitalAssetsGridFilters(state)
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

  return {
    filterOptions,
    items: prepareDigitalAssets(assetsWithBalance, filterOptions, searchQuery),
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(HomeView)
