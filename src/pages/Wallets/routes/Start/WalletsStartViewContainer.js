// @flow

import { connect } from 'react-redux'
import { actions } from 'redux-router5'

import { WalletsStartView } from './WalletsStartView'

const mapDispatchToProps = {
  // FIXME: refactor to base links
  createWallet: () => actions.navigateTo('WalletsCreate'),
  importWallet: () => actions.navigateTo('WalletsImport'),
}

export const WalletsStartViewContainer = (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(null, mapDispatchToProps)
)(WalletsStartView)
