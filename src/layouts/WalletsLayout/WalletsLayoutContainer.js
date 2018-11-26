// @flow

import { connect } from 'react-redux'

import {
  openLayout,
  closeLayout,
} from 'routes/Wallets/modules/wallets'

import WalletsLayout from './WalletsLayout'

const mapDispatchToProps = {
  openLayout,
  closeLayout,
}

export default (
  connect/* :: < AppState, any, Object, _, _ > */(null, mapDispatchToProps)
)(WalletsLayout)

