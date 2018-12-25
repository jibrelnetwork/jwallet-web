// @flow

import { connect } from 'react-redux'

import { selectWalletsAddressesList } from 'store/stateSelectors'
import { reactRouterBack } from 'utils/browser'

import DigitalAssetsReceiveView from './DigitalAssetsReceiveView'

import {
  openView,
  closeView,
} from './modules/digitalAssetsReceive'

const mapStateToProps = (state: AppState) => {
  const items: AddressNames = selectWalletsAddressesList(state)
    .reduce((acc, address) => ({ ...acc, [address]: address }), {})

  return {
    items,
  }
}

const mapDispatchToProps = {
  close: () => reactRouterBack({ fallbackUrl: '/digital-assets' }),
  openView,
  closeView,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsReceiveView)
