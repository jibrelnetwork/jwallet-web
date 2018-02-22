// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import {
  open,
  close,
  setCurrent,
  setNew,
  setConfirm,
  changePassword,
} from '../modules/changeWalletPassword'

import ChangeWalletPassword from '../components/ChangeWalletPassword'

const mapStateToProps = ({ changeWalletPassword }: State): ChangeWalletPasswordData => ({
  ...changeWalletPassword,
})

const mapDispatchToProps = {
  open,
  close,
  setCurrent,
  setNew,
  setConfirm,
  changePassword,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(ChangeWalletPassword)
