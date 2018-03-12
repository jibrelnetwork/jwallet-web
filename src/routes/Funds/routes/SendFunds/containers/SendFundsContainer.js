// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import { getActiveDigitalAssetsData, getWalletNameAndAddress } from 'utils'

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

import SendFunds from '../components/SendFunds'

const mapStateToProps = ({ digitalAssets, wallets, sendFunds }: State) => ({
  ...sendFunds,
  sender: getWalletNameAndAddress(wallets.activeWalletId),
  digitalAssets: getActiveDigitalAssetsData(digitalAssets),
})

const mapDispatchToProps = {
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
)(SendFunds)
