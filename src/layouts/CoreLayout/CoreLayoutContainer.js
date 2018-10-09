// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import { init } from 'routes/modules/networks'

import 'styles/core.scss'

import CoreLayout from './CoreLayout'

const mapStateToProps = ({ networks, wallets, digitalAssets }: State) => ({
  isNetworksInited: networks.isInitialised,
  isWalletsInited: wallets.isInitialised,
  isDigitalAssetsInited: digitalAssets.isInitialised,
})

const mapDispatchToProps = { init }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { /* this.props.init() */ },
  }),
)(CoreLayout)
