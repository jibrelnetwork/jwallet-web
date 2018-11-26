// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import BigNumber from 'bignumber.js'

import {
  selectDigitalAssets,
  selectDigitalAssetsGridFilters,
  selectDigitalAssetsGridSearchQuery,
} from 'store/selectors/digitalAssets'

import { selectCurrentBlockNumber } from 'store/selectors/blocks'
import { selectNetworkId } from 'store/selectors/networks'
import { selectDigitalAssetBalance } from 'store/selectors/balances'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
// import { divDecimals } from 'utils/numbers'

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

const parseBalance = (balance: ?Balance): Balance => (balance ? {
  ...balance,
  balance: new BigNumber(balance.balance),
} : {
  isLoading: false,
  balance: new BigNumber(0),
})

const mapStateToProps = (state: AppState) => {
  const networkId = selectNetworkId(state)

  // assets grid selectors
  const assets = selectDigitalAssets(state /* , networkId */)
  const filter = selectDigitalAssetsGridFilters(state)
  const searchQuery = selectDigitalAssetsGridSearchQuery(state)

  const currentOwnerAddress = selectActiveWalletAddress(state) || ''
  const currentBlockNumber = selectCurrentBlockNumber(state, networkId) || 0

  const {
    sortBy,
    sortByNameDirection,
    sortByBalanceDirection,
    isHideZeroBalance,
  } = filter

  const sortByNameFn = (
    { asset: { name: nameA } },
    { asset: { name: nameB } },
  ): number => {
    if (nameA > nameB) {
      return (sortByNameDirection === 'asc') ? 1 : -1
    } else if (nameA < nameB) {
      return (sortByNameDirection === 'asc') ? -1 : 1
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
      return (sortByBalanceDirection === 'asc') ? 1 : -1
    } else if (balanceA < balanceB) {
      return (sortByBalanceDirection === 'asc') ? -1 : 1
    } else {
      return 0
    }
  }

  const items = Object.keys(assets)
    .map(assetAddress => ({
      asset: assets[assetAddress],
      balance: parseBalance(selectDigitalAssetBalance(
        state,
        currentBlockNumber,
        currentOwnerAddress,
        assetAddress
      )),
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
  manageAssetsOpenClick: () => push('/digital-assets/manage'),
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsGridView)
