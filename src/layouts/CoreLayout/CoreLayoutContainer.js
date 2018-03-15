// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import { init as initWallets } from 'routes/Wallets/modules/wallets'

import 'styles/core.scss'

import CoreLayout from './CoreLayout'

const mapStateToProps = ({ networks }) => networks

const mapDispatchToProps = {
  initWallets,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.initWallets() },
  }),
)(CoreLayout)
