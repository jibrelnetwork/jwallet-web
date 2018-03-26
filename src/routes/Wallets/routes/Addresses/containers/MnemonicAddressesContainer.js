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

import MnemonicAddresses from '../components/MnemonicAddresses'

const mapStateToProps = ({ mnemonicAddresses }: State): MnemonicAddressesData => ({
  ...mnemonicAddresses,
})

const mapDispatchToProps = {
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
)(MnemonicAddresses)
