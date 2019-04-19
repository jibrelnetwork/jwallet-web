// @flow

import { connect } from 'react-redux'

import {
  openLayout,
  closeLayout,
} from 'store/modules/wallets'

import { WalletsLayout } from './WalletsLayout'

const mapDispatchToProps = {
  openLayout,
  closeLayout,
}

export const WalletsLayoutContainer = (
  connect/* :: < AppState, any, Object, _, _ > */(null, mapDispatchToProps)
)(WalletsLayout)
