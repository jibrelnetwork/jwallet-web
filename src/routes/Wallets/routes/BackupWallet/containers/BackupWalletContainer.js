// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import {
  open,
  close,
  setPassword,
  backup,
} from '../modules/backupWallet'

import BackupWallet from '../components/BackupWallet'

const mapStateToProps = ({ backupWallet }: State): BackupWalletData => backupWallet

const mapDispatchToProps = {
  open,
  close,
  setPassword,
  backup,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(BackupWallet)
