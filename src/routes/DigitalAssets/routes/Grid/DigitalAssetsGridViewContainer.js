// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  selectDigitalAssets,
  selectCurrentBlockNumber,
  selectDigitalAssetBalance,
  selectDigitalAssetsGridFilters,
  selectDigitalAssetsGridSearchQuery,
} from 'store/stateSelectors'

import DigitalAssetsGridView from './DigitalAssetsGridView'

import {
  openView,
  closeView,
  setSearchQuery,
  sortByNameClick,
  sortByBalanceClick,
  setHideZeroBalance,
} from './modules/digitalAssetsGrid'

const checkSearchQuery = (asset: DigitalAsset, searchQuery: string): boolean => {
  const query = searchQuery.trim().toUpperCase()
  const { name, symbol, address } = asset

  if ((query.length < 2) ||
      (symbol.toUpperCase().indexOf(query) !== -1) ||
      (name.toUpperCase().indexOf(query) !== -1) ||
      (address.toUpperCase() === query) ||
      (address.substr(2).toUpperCase() === query)) {
    return true
  }

  return false
}

const mapStateToProps = (state: AppState) => {
  const currentBlock = selectCurrentBlockNumber(state)
  const currentOwnerAddress = ''
  const assets = selectDigitalAssets(state)
  const filter = selectDigitalAssetsGridFilters(state)
  const searchQuery = selectDigitalAssetsGridSearchQuery(state)

  const {
    sortBy,
    sortByNameOrder,
    sortByBalanceOrder,
    isHideZeroBalance,
  } = filter

  const sortByNameFn = (
    { asset: { name: nameA } },
    { asset: { name: nameB } },
  ): number => {
    if (nameA > nameB) {
      return (sortByNameOrder === 'asc') ? 1 : -1
    } else if (nameA < nameB) {
      return (sortByNameOrder === 'asc') ? -1 : 1
    } else {
      return 0
    }
  }

  const sortByBalanceFn = (a, b): number => {
    if (!a.balance || !b.balance) {
      return 0
    }

    const { balance: balanceA } = a.balance
    const { balance: balanceB } = b.balance

    if (balanceA > balanceB) {
      return (sortByBalanceOrder === 'asc') ? 1 : -1
    } else if (balanceA < balanceB) {
      return (sortByBalanceOrder === 'asc') ? -1 : 1
    } else {
      return 0
    }
  }

  const items = Object.keys(assets)
    .map(assetAddress => ({
      asset: assets[assetAddress],
      balance: selectDigitalAssetBalance(
        state,
        currentBlock,
        currentOwnerAddress,
        assetAddress
      ),
    }))
    .filter(item =>
      item.asset.isActive &&
      (!isHideZeroBalance || (isHideZeroBalance && item.balance && item.balance.balance > 0)) &&
      checkSearchQuery(item.asset, searchQuery)
    )

  // eslint-disable-next-line fp/no-mutating-methods
  items.sort(sortByNameFn)
  if (sortBy === 'balance') {
    // eslint-disable-next-line fp/no-mutating-methods
    items.sort(sortByBalanceFn)
  }

  // filter counter in icon
  const filterCount = (isHideZeroBalance) ? 1 : 0

  return {
    items,
    filter,
    filterCount,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  setSearchQuery,
  sortByNameClick,
  sortByBalanceClick,
  setHideZeroBalance,
  addAssetClick: () => push('/digital-assets/add-asset'),
}

// eslint-disable-next-line no-unused-vars
type OwnProps = {||}

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsGridView)
