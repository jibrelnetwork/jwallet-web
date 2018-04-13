// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  open,
  close,
  setName,
  setData,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setPassword,
  setPasswordConfirm,
  setNextStep,
  setPrevStep,
} from '../modules/importWallet'

import WalletsImportView from '../components/WalletsImportView'

const mapStateToProps: Function = ({ importWallet }: State): ImportWalletData => importWallet

const mapDispatchToProps: {
  open: Function,
  close: Function,
  setName: Function,
  setData: Function,
  setKnownDerivationPath: Function,
  setCustomDerivationPath: Function,
  setPassword: Function,
  setPasswordConfirm: Function,
  setNextStep: Function,
  setPrevStep: Function,
  goToHome: Function,
  goToWallets: Function,
} = {
  open,
  close,
  setName,
  setData,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setPassword,
  setPasswordConfirm,
  setNextStep,
  setPrevStep,
  goToHome: () => push('/'),
  goToWallets: () => push('/wallets'),
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(WalletsImportView)
