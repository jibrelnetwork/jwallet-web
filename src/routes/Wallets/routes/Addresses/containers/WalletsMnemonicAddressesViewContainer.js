// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import checkWalletReadOnly from 'utils/keystore/checkWalletReadOnly'

import WalletsMnemonicAddressesView from '../components/WalletsMnemonicAddressesView'
import { open, close, getMore, setActive } from '../modules/mnemonicAddresses'

const mapStateToProps: Function = ({ mnemonicAddresses, wallets }: State): {
  addresses: Addresses,
  isReadOnly: boolean,
} => ({
  addresses: mnemonicAddresses.addresses,
  isReadOnly: checkWalletReadOnly(wallets.activeWalletId),
})

const mapDispatchToProps: {
  open: Function,
  close: Function,
  goBack: Function,
  getMore: Function,
  setActive: Function,
} = {
  open,
  close,
  getMore,
  setActive,
  goBack: () => push('/wallets'),
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(WalletsMnemonicAddressesView)
