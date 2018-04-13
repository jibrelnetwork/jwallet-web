// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import WalletsBackupView from '../components/WalletsBackupView'
import { open, close, setPassword, setNextStep } from '../modules/backupWallet'

const mapStateToProps: Function = ({ backupWallet }: State): BackupWalletData => backupWallet

const mapDispatchToProps: {
  open: Function,
  close: Function,
  setPassword: Function,
  setNextStep: Function,
} = { open, close, setPassword, setNextStep }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(WalletsBackupView)
