// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

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
  setPassword,
  setActive,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
  }),
)(Wallets)

