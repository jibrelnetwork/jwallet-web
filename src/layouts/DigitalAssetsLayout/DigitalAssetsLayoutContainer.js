// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import { open, close } from 'routes/DigitalAssets/modules/digitalAssets'

import DigitalAssetsLayout from './DigitalAssetsLayout'

const mapStateToProps = null
const mapDispatchToProps = { open, close }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(DigitalAssetsLayout)
