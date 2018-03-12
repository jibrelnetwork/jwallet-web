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
  saveQRCode,
  copyAddress,
} from '../modules/receiveFunds'

import ReceiveFunds from '../components/ReceiveFunds'

const mapStateToProps = ({ digitalAssets, wallets, receiveFunds }: State) => ({
  ...receiveFunds,
  digitalAssets: getActiveDigitalAssetsData(digitalAssets),
  recipient: getWalletNameAndAddress(wallets.activeWalletId),
})

const mapDispatchToProps = {
  open,
  close,
  setAsset,
  setAmount,
  saveQRCode,
  copyAddress,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(ReceiveFunds)
