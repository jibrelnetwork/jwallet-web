// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  selectDigitalAssets,
  selectCurrentBlockNumber,
  selectDigitalAssetBalance,
  selectDigitalAssetsManageSearchQuery,
} from 'store/stateSelectors'

import DigitalAssetsManageView from './DigitalAssetsManageView'

import {
  openView,
  closeView,
  setSearchQuery,
} from './modules/digitalAssetsManage'

import {
  setAssetIsActive,
  deleteAsset,
} from '../../modules/digitalAssets'

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

const sortByNameFn = (
  { asset: { name: nameA } },
  { asset: { name: nameB } },
): number => {
  if (nameA > nameB) {
    return 1
  } else if (nameA < nameB) {
    return -1
  } else {
    return 0
  }
}

const sortByCustomFirstFn = (
  { asset: { isCustom: A } },
  { asset: { isCustom: B } },
): number => {
  if (A === false && B === true) {
    return 1
  } else if (A === true && B === false) {
    return -1
  } else {
    return 0
  }
}

const mapStateToProps = (state: AppState) => {
  const currentBlock = selectCurrentBlockNumber(state)
  const assets = selectDigitalAssets(state)
  const searchQuery = selectDigitalAssetsManageSearchQuery(state)
  const currentOwnerAddress = ''

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
    .filter(item => checkSearchQuery(item.asset, searchQuery))

  // eslint-disable-next-line fp/no-mutating-methods
  items.sort(sortByNameFn)
  // eslint-disable-next-line fp/no-mutating-methods
  items.sort(sortByCustomFirstFn)

  return {
    items,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  setSearchQuery,
  setAssetIsActive,
  deleteCustomAsset: deleteAsset,
  addAssetClick: () => push('/digital-assets/add-asset'),
  editAsset: (address: Address) => push(`/digital-assets/edit-asset/${address}`),
}

// eslint-disable-next-line no-unused-vars
type OwnProps = {||}

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsManageView)
