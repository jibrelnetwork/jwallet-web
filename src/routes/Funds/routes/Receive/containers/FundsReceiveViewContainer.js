// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import getWalletNameAndAddress from 'utils/keystore/getWalletNameAndAddress'

import FundsReceiveView from '../components/FundsReceiveView'

import {
  open,
  close,
  setAsset,
  setAmount,
  copyQRCode,
  saveQRCode,
  copyAddress,
} from '../modules/receiveFunds'

const mapStateToProps: Function = ({ wallets, receiveFunds }: State) => ({
  ...receiveFunds,
  recipient: getWalletNameAndAddress(wallets.activeWalletId),
})

const mapDispatchToProps: {
  open: Function,
  close: Function,
  setAsset: Function,
  setAmount: Function,
  copyQRCode: Function,
  saveQRCode: Function,
  copyAddress: Function,
} = {
  open,
  close,
  setAsset,
  setAmount,
  copyQRCode,
  saveQRCode,
  copyAddress,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(FundsReceiveView)
