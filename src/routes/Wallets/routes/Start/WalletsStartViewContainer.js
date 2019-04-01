// @flow

import { connect } from 'react-redux'
import { actions } from 'redux-router5'

import {
  openView,
  closeView,
} from 'store/modules/walletsStart'

import WalletsStartView from './WalletsStartView'

const mapDispatchToProps = {
  openView,
  closeView,
  // FIXME: refactor to base links
  createWallet: () => actions.navigateTo('WalletsCreate'),
  importWallet: () => actions.navigateTo('WalletsImport'),
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(null, mapDispatchToProps)
)(WalletsStartView)
