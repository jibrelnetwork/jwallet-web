/* @flow */

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  open,
  toggleWallet,
  showActionsMenu,
  setWalletAction,
  setPassword,
  setActive,
} from '../modules/wallets'

import Wallets from '../components/Wallets'

const mapStateToProps = ({ wallets }: State): WalletsData => wallets

const mapDispatchToProps = {
  open,
  toggleWallet,
  showActionsMenu,
  setWalletAction,
  setActive,
  createWallet: () => push('/wallets/create'),
  importWallet: () => push('/wallets/import'),
  setPassword: event => setPassword(event.target.value),
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
  }),
)(Wallets)

