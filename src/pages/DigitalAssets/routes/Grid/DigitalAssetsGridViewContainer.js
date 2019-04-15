// @flow

import { connect } from 'react-redux'

// import isZero from 'utils/numbers/isZero'

import {
  selectActiveWallet,
} from 'store/selectors/wallets'

import {
  selectDigitalAssetsPersist,
  // selectDigitalAssetsGridSearchQuery,
} from 'store/selectors/digitalAssets'

// import {
  // searchDigitalAssets,
  // compareDigitalAssetsByName,
  // compareDigitalAssetsByBalance,
// } from 'utils/digitalAssets'

import {
  openView,
  closeView,
  setSearchQuery,
  sortByNameClick,
  sortByBalanceClick,
  setHideZeroBalance,
} from 'store/modules/digitalAssetsGrid'

import DigitalAssetsGridView from './DigitalAssetsGridView'

// function filterActiveDigitalAssets(items: DigitalAssetWithBalance[]): DigitalAssetWithBalance[] {
//   return items.filter(({ isActive }: DigitalAssetWithBalance) => !!isActive)
// }

// function filterZeroBalanceDigitalAssets(
//   items: DigitalAssetWithBalance[],
//   isHideZeroBalance: boolean,
// ): DigitalAssetWithBalance[] {
//   if (!isHideZeroBalance) {
//     return items
//   }
//
//   return items
//     .filter(
//      ({ balance }: DigitalAssetWithBalance): boolean => !!balance && !isZero(balance.value)
//     )
// }

// function sortDigitalAssets(
//   items: DigitalAssetWithBalance[],
//   filterOptions: DigitalAssetsFilterOptions,
// ): DigitalAssetWithBalance[] {
//   const {
//     sortBy,
//     sortByNameDirection,
//     sortByBalanceDirection,
//   }: DigitalAssetsFilterOptions = filterOptions
//
//   // eslint-disable-next-line fp/no-mutating-methods
//   const itemsSortedByName: DigitalAssetWithBalance[] = [...items].sort((
//     first: DigitalAssetWithBalance,
//     second: DigitalAssetWithBalance,
//   ): number => compareDigitalAssetsByName(first.name, second.name, sortByNameDirection))
//
//   if (sortBy === 'balance') {
//     // eslint-disable-next-line fp/no-mutating-methods
//     return [...itemsSortedByName].sort((
//       first: DigitalAssetWithBalance,
//       second: DigitalAssetWithBalance,
//     ): number => compareDigitalAssetsByBalance(
//       first,
//       second,
//       sortByBalanceDirection,
//     ))
//   }
//
//   return itemsSortedByName
// }

// function prepareDigitalAssets(
//   items: DigitalAssetWithBalance[],
//   filterOptions: DigitalAssetsFilterOptions,
//   searchQuery: string,
// ): DigitalAssetWithBalance[] {
//   const itemsActive: DigitalAssetWithBalance[] = filterActiveDigitalAssets(items)
//
//   const itemsFiltered: DigitalAssetWithBalance[] = filterZeroBalanceDigitalAssets(
//     itemsActive,
//     filterOptions.isHideZeroBalance,
//   )
//
//   const itemsFound: DigitalAssetWithBalance[] = searchDigitalAssets(
//     itemsFiltered,
//     searchQuery,
//   )
//
//   const itemsSorted: DigitalAssetWithBalance[] = sortDigitalAssets(
//     itemsFound,
//     filterOptions,
//   )
//
//   return itemsSorted
// }

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

  // const searchQuery: string = selectDigitalAssetsGridSearchQuery(state)
  const { active } = selectDigitalAssetsPersist(state)

  return {
    filterOptions: {},
    items: active,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  setSearchQuery,
  sortByNameClick,
  sortByBalanceClick,
  setHideZeroBalance,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsGridView)
