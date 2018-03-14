// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import { getNetworksFromStorage } from 'routes/JWallet/modules/networks'

import MenuLayout from './MenuLayout'

const mapStateToProps = null

const mapDispatchToProps = {
  getNetworksFromStorage,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { getNetworksFromStorage, networks } = this.props

      if (!networks || !networks.items || networks.items.length) {
        getNetworksFromStorage()
      }
    },
  }),
)(MenuLayout)
