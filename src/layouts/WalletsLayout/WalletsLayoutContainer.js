// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import { open, close } from 'routes/Wallets/modules/wallets'

import WalletsLayout from './WalletsLayout'

const mapStateToProps = null
const mapDispatchToProps = { open, close }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(WalletsLayout)
