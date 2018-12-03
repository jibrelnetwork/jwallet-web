// @flow

import { connect } from 'react-redux'
import { BigNumber } from 'bignumber.js'
import { push } from 'react-router-redux'

import {
  selectDigitalAssets,
  selectDigitalAssetsGridFilters,
  selectDigitalAssetsGridSearchQuery,
} from 'store/selectors/digitalAssets'

import {
  checkAssetFound,
  compareDigitalAssetsByName,
  getDigitalAssetsWithBalance,
  compareDigitalAssetsByBalance,
} from 'utils/digitalAssets'

import { selectCurrentBlock } from 'store/selectors/blocks'
import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { selectBalancesByOwnerAddress } from 'store/selectors/balances'

import DigitalAssetsGridView from './DigitalAssetsGridView'

import {
  openView,
  closeView,
  setSearchQuery,
  sortByNameClick,
  sortByBalanceClick,
  setHideZeroBalance,
} from './modules/digitalAssetsGrid'

const mapStateToProps = (state: AppState) => {
  const networkId: NetworkId = selectCurrentNetworkId(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state, networkId)
  const currentBlockNumber: number = currentBlock ? currentBlock.number : 0
  const ownerAddress: ?OwnerAddress = selectActiveWalletAddress(state)
  const assets: DigitalAssets = selectDigitalAssets(state /* , networkId */)
  const filter = selectDigitalAssetsGridFilters(state)
  const searchQuery: string = selectDigitalAssetsGridSearchQuery(state)

  const assetsBalances: ?Balances = !ownerAddress ? null : selectBalancesByOwnerAddress(
    state,
    networkId,
    currentBlockNumber,
    ownerAddress,
  )

  const {
    sortBy,
    sortByNameDirection,
    sortByBalanceDirection,
    isHideZeroBalance,
  } = filter

  const assetsWithBalance: DigitalAssetWithBalance[] = getDigitalAssetsWithBalance(
    assets,
    assetsBalances,
  )

  const items: DigitalAssetWithBalance[] = assetsWithBalance
    .filter((item: DigitalAssetWithBalance): boolean => {
      const {
        balance,
        name,
        symbol,
        address,
        isActive,
      }: DigitalAssetWithBalance = item

      const isAssetFound: boolean = checkAssetFound(name, symbol, address, searchQuery)
      const isBalanceExist: boolean = !!(balance && (new BigNumber(balance.value)).gt(0))

      return (
        !!isActive &&
        (!isHideZeroBalance || (isHideZeroBalance && isBalanceExist)) &&
        isAssetFound
      )
    })

  // eslint-disable-next-line fp/no-mutating-methods
  items.sort((
    first: DigitalAssetWithBalance,
    second: DigitalAssetWithBalance,
  ): number => compareDigitalAssetsByName(first.name, second.name, sortByNameDirection))

  if (sortBy === 'balance') {
    // eslint-disable-next-line fp/no-mutating-methods
    items.sort((
      first: DigitalAssetWithBalance,
      second: DigitalAssetWithBalance,
    ): number => compareDigitalAssetsByBalance(
      first.balance,
      second.balance,
      sortByBalanceDirection,
    ))
  }

  return {
    items,
    filter,
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
