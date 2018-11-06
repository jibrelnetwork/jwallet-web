// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import getWalletNameAndAddress from 'utils/keystore/getWalletNameAndAddress'

import FundsSendView from '../components/FundsSendView'

import {
  open,
  close,
  setAsset,
  setAmount,
  setRecipient,
  setGas,
  setGasPrice,
  setNonce,
  setPassword,
  setNextStep,
} from '../modules/sendFunds'

const mapStateToProps: Function = ({ wallets, sendFunds }: AppState) => ({
  ...sendFunds,
  sender: getWalletNameAndAddress(wallets.activeWalletId),
})

const mapDispatchToProps: {
  open: Function,
  close: Function,
  setAsset: Function,
  setAmount: Function,
  setRecipient: Function,
  setGas: Function,
  setGasPrice: Function,
  setNonce: Function,
  setPassword: Function,
  setNextStep: Function,
} = {
  open,
  close,
  setAsset,
  setAmount,
  setRecipient,
  setGas,
  setGasPrice,
  setNonce,
  setPassword,
  setNextStep,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(FundsSendView)
