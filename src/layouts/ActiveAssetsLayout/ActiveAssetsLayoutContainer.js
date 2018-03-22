// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import { getBalances } from 'routes/DigitalAssets/modules/digitalAssets'

import ActiveAssetsLayout from './ActiveAssetsLayout'

const mapStateToProps = null
const mapDispatchToProps = { getBalances }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.getBalances() },
  }),
)(ActiveAssetsLayout)
