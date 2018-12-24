// @flow

import { connect } from 'react-redux'
import { selectWalletsAddresses } from 'store/stateSelectors'

import DigitalAssetsReceiveView from './DigitalAssetsReceiveView'

import {
  openView,
  closeView,
} from './modules/digitalAssetsReceive'

const mapStateToProps = (state: AppState) => {
  const items = selectWalletsAddresses(state).addresses.map(address => ({ address, title: '' }))
  return {
    items,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsReceiveView)
