// @flow

import { connect } from 'react-redux'

import {
  selectActiveWallet,
} from 'store/selectors/wallets'

import {
  selectDigitalAssetsPersist,
} from 'store/selectors/digitalAssets'

import {
  openView,
  closeView,
} from 'store/modules/digitalAssetsGrid'

import { HomeView } from './HomeView'

function mapStateToProps(state: AppState) {
  const wallet: ?Wallet = selectActiveWallet(state)

  if (!wallet) {
    return {
      items: [],
    }
  }

  const { active } = selectDigitalAssetsPersist(state)

  return {
    items: active,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(HomeView)
