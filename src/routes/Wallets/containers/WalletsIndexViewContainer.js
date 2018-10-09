// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  openView,
  toggleWallet,
  setActiveWallet,
} from '../modules/wallets'

import WalletsIndexView from '../components/WalletsIndexView'

const mapStateToProps = ({ wallets }: State): WalletsState => wallets

const mapDispatchToProps = {
  openView,
  toggleWallet,
  setActiveWallet,
  createWallet: () => push('/wallets/create'),
  importWallet: () => push('/wallets/import'),
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.openView() },
  }),
)(WalletsIndexView)

