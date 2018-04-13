// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import WalletsRemoveView from '../components/WalletsRemoveView'
import { open, close, remove } from '../modules/removeWallet'

const mapDispatchToProps: {
  open: Function,
  close: Function,
  remove: Function,
} = { open, close, remove }

export default compose(
  connect(null, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(WalletsRemoveView)
