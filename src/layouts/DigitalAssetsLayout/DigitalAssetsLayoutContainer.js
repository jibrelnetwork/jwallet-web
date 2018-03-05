// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import {
  open,
  close,
} from 'routes/DigitalAssets/modules/digitalAssets'

import { init as initWallets } from 'routes/Wallets/modules/wallets'

import DigitalAssetsLayout from './DigitalAssetsLayout'

const mapStateToProps = null

const mapDispatchToProps = {
  open,
  close,
  initWallets,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.initWallets()
      this.props.open()
    },
    componentWillUnmount() { this.props.close() },
  }),
)(DigitalAssetsLayout)
