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

import WalletsChangePasswordView from '../components/WalletsChangePasswordView'

const mapStateToProps: Function = ({ changeWalletPassword }: State): ChangeWalletPasswordData => {
  return changeWalletPassword
}

const mapDispatchToProps: {
  open: Function,
  close: Function,
  setCurrent: Function,
  setNew: Function,
  setConfirm: Function,
  changePassword: Function,
} = {
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
)(WalletsChangePasswordView)
