// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  open,
  close,
  setActive,
  getMore,
} from '../modules/mnemonicAddresses'

import WalletsMnemonicAddressesView from '../components/WalletsMnemonicAddressesView'

const mapStateToProps: Function = ({ mnemonicAddresses }: State): MnemonicAddressesData => {
  return mnemonicAddresses
}

const mapDispatchToProps: {
  open: Function,
  close: Function,
  setActive: Function,
  getMore: Function,
  goBack: Function,
} = {
  open,
  close,
  setActive,
  getMore,
  goBack: () => push('/wallets'),
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(WalletsMnemonicAddressesView)
