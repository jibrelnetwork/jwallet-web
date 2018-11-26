// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import WalletsStartView from './WalletsStartView'

import {
  openView,
  closeView,
} from './modules/walletsStart'

const mapDispatchToProps = {
  openView,
  closeView,
  goToTerms: () => push('/terms'),
  createWallet: () => push('/wallets/create'),
  importWallet: () => push('/wallets/import'),
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(null, mapDispatchToProps)
)(WalletsStartView)
