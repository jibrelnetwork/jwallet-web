// @flow

import { connect } from 'react-redux'
import {
  selectDigitalAssets,
  selectCurrentBlockNumber,
  selectDigitalAssetBalance,
} from 'store/stateSelectors'

import DigitalAssetsGridView from './DigitalAssetsGridView'

import {
  openView,
  closeView,
  setSearchQuery,
} from './modules/digitalAssetsGrid'

const mapStateToProps = (state: AppState) => {
  const currentBlock = selectCurrentBlockNumber(state)
  const currentOwnerAddress = ''
  const assets = selectDigitalAssets(state)
  // const searchQuery = selectDigitalAssets(state).searchQuery

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
  // next time:
  // sort
  // filter

  return {
    items,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  setSearchQuery,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DigitalAssetsGridView)
