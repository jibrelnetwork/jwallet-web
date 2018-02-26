// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import {
  open,
  close,
  remove,
} from '../modules/removeWallet'

import RemoveWallet from '../components/RemoveWallet'

const mapStateToProps = null

const mapDispatchToProps = {
  open,
  close,
  remove,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(RemoveWallet)
