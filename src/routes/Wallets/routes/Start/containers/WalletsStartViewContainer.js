// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import WalletsStartView from '../components/WalletsStartView'
import { open, close } from '../modules/start'

const mapDispatchToProps: {
  open: Function,
  close: Function,
  createWallet: Function,
  importWallet: Function,
} = {
  open,
  close,
  createWallet: () => push('/wallets/create'),
  importWallet: () => push('/wallets/import'),
}

export default compose(
  connect(null, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(WalletsStartView)
