// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import { init } from 'routes/Wallets/modules/wallets'

import WalletsLayout from './WalletsLayout'

const mapStateToProps = null

const mapDispatchToProps = {
  init,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() { this.props.init() },
  }),
)(WalletsLayout)
