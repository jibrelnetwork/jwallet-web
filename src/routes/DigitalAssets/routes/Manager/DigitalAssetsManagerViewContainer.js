// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  selectDigitalAssets,
  selectCurrentBlockNumber,
  selectDigitalAssetBalance,
  selectDigitalAssetsManagerSearchQuery,
} from 'store/stateSelectors'

import DigitalAssetsManagerView from './DigitalAssetsManagerView'

import {
  openView,
  closeView,
  setSearchQuery,
} from './modules/digitalAssetsManager'

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

const mapStateToProps = (state: AppState) => {
  const currentBlock = selectCurrentBlockNumber(state)
  const assets = selectDigitalAssets(state)
  const searchQuery = selectDigitalAssetsManagerSearchQuery(state)
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

  return {
    items,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  setSearchQuery,
  addAssetClick: () => push('/digital-assets/add-asset'),
}

// eslint-disable-next-line no-unused-vars
type OwnProps = {||}

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsManagerView)
