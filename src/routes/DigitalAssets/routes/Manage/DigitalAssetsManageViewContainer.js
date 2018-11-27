// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  selectDigitalAssets,
  selectDigitalAssetsManageSearchQuery,
} from 'store/selectors/digitalAssets'
import { selectCurrentBlockNumber } from 'store/selectors/blocks'
import { selectDigitalAssetBalance } from 'store/selectors/balances'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { parseBalance } from 'utils/digitalAssets'

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
import { selectNetworkId } from '../../../../store/stateSelectors'

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

const sortAssetsFn = (
  { asset: { name: nameA, isCustom } },
  { asset: { name: nameB } },
): number => {
  if (isCustom) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  } else if (nameA < nameB) {
    return -1
  } else {
    return 0
  }
}

const mapStateToProps = (state: AppState) => {
  const networkId = selectNetworkId(state)

  // assets grid selectors
  const assets = selectDigitalAssets(state /* , networkId */)
  const currentBlockNumber = selectCurrentBlockNumber(state, networkId) || 0

  const currentOwnerAddress = selectActiveWalletAddress(state) || ''
  const searchQuery = selectDigitalAssetsManageSearchQuery(state)

  const items = Object.keys(assets)
    .map((assetAddress) => {
      const assetBalance = selectDigitalAssetBalance(
        state,
        currentBlockNumber,
        currentOwnerAddress,
        assetAddress
      )

      if (assetBalance) {
        return {
          asset: assets[assetAddress],
          isLoading: assetBalance.isLoading,
          balance: assetBalance.isLoading
            ? '0'
            : parseBalance(assetBalance.balance, assets[assetAddress].decimals),
        }
      } else {
        return {
          asset: assets[assetAddress],
          balance: '0',
          isLoading: false,
        }
      }
    })
    .filter(item => checkSearchQuery(item.asset, searchQuery))

  // eslint-disable-next-line fp/no-mutating-methods
  items.sort(sortAssetsFn)

  return {
    items,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  setSearchQuery,
  setAssetIsActive,
  deleteCustomAsset,
  editAsset: (address: Address) => push(`/digital-assets/edit-asset/${address}`),
  addAssetClick: () => push('/digital-assets/add-asset'),
}

// eslint-disable-next-line no-unused-vars
type OwnProps = {||}

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsManageView)
