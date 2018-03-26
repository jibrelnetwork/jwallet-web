// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Start from '../components/Start'
import { open, close } from '../modules/start'

const mapStateToProps = null

const mapDispatchToProps = {
  open,
  close,
  createWallet: () => push('/wallets/create'),
  importWallet: () => push('/wallets/import'),
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(Start)
