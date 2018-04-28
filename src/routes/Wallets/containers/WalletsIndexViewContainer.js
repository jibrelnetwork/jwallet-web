// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  open,
  setActive,
  setPassword,
  toggleWallet,
  showActionsMenu,
  setWalletAction,
} from '../modules/wallets'

import WalletsIndexView from '../components/WalletsIndexView'

const mapStateToProps = ({ wallets }: State): WalletsData => wallets

const mapDispatchToProps = {
  open,
  setActive,
  toggleWallet,
  showActionsMenu,
  setWalletAction,
  createWallet: () => push('/wallets/create'),
  importWallet: () => push('/wallets/import'),
  setPassword: event => setPassword(event.target.value),
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
  }),
)(WalletsIndexView)

