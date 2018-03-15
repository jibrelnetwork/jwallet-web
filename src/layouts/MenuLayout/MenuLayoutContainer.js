// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import { init as initNetworks } from 'routes/modules/networks'

import MenuLayout from './MenuLayout'

const mapStateToProps = ({ networks }: State): { networks: Networks } => ({
  networks: networks.items,
})

const mapDispatchToProps = {
  initNetworks,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { networks } = this.props

      if (!networks.items || !networks.items.length) {
        this.props.initNetworks()
      }
    },
  }),
)(MenuLayout)
