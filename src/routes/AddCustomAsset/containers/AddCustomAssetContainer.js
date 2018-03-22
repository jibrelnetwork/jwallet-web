// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import {
  open,
  close,
  setAddress,
  setName,
  setSymbol,
  setDecimals,
  add,
} from '../modules/addCustomAsset'

import AddCustomAsset from '../components/AddCustomAsset'

const mapStateToProps = ({ addCustomAsset }) => addCustomAsset

const mapDispatchToProps = {
  open,
  close,
  setAddress,
  setName,
  setSymbol,
  setDecimals,
  add,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(AddCustomAsset)
