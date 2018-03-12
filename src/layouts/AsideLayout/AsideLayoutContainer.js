// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import { init as initDigitalAssets } from 'routes/DigitalAssets/modules/digitalAssets'
import { init as initWallets } from 'routes/Wallets/modules/wallets'

import AsideLayout from './AsideLayout'

const mapStateToProps = null

const mapDispatchToProps = {
  initDigitalAssets,
  initWallets,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.initDigitalAssets()
      this.props.initWallets()
    },
  }),
)(AsideLayout)
