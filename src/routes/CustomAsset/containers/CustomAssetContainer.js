// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import CustomAsset from '../components/CustomAsset'

import {
  open,
  close,
  add,
  edit,
  remove,
  setAddress,
  setName,
  setSymbol,
  setDecimals,
} from '../modules/customAsset'

const mapStateToProps = ({ customAsset, router }: State): {
  invalidFields: FormFields,
  address: Address,
  name: string,
  symbol: string,
  decimals: string,
  type: string,
} => ({
  ...customAsset,
  type: router.locationBeforeTransitions.pathname.replace(/\/.*\//g, ''),
})

const mapDispatchToProps: {
  open: Function,
  close: Function,
  add: Function,
  edit: Function,
  remove: Function,
  setAddress: Function,
  setName: Function,
  setSymbol: Function,
  setDecimals: Function,
} = { open, close, add, edit, remove, setAddress, setName, setSymbol, setDecimals }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(CustomAsset)
