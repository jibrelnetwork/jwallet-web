// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  openView,
  toggleWallet,
  setActiveWallet,
} from './modules/wallets'

import WalletsIndexView from './WalletsIndexView'

const mapStateToProps = ({ wallets }: State): WalletsState => wallets

const mapDispatchToProps = {
  openView,
  toggleWallet,
  setActiveWallet,
  createWallet: () => push('/wallets/create'),
  importWallet: () => push('/wallets/import'),
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletsIndexView)
