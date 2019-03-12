// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  openView,
  closeView,
} from 'store/modules/walletsStart'

import WalletsStartView from './WalletsStartView'

const mapDispatchToProps = {
  openView,
  closeView,
  createWallet: () => push('/wallets/create'),
  importWallet: () => push('/wallets/import'),
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(null, mapDispatchToProps)
)(WalletsStartView)
