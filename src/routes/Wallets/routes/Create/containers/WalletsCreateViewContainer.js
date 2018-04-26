// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  open,
  close,
  setName,
  setPassword,
  copyMnemonic,
  saveMnemonic,
  setPasswordConfirm,
  setMnemonicConfirm,
  setNextStep,
  setPrevStep,
} from '../modules/createWallet'

import WalletsCreateView from '../components/WalletsCreateView'

const mapStateToProps: Function = ({ createWallet }: State): CreateWalletData => createWallet

const mapDispatchToProps: {
  open: Function,
  close: Function,
  setName: Function,
  goToHome: Function,
  goToWallets: Function,
  setPassword: Function,
  setNextStep: Function,
  setPrevStep: Function,
  copyMnemonic: Function,
  saveMnemonic: Function,
  setPasswordConfirm: Function,
  setMnemonicConfirm: Function,
} = {
  open,
  close,
  setName,
  setPassword,
  setNextStep,
  setPrevStep,
  copyMnemonic,
  saveMnemonic,
  setPasswordConfirm,
  setMnemonicConfirm,
  goToHome: () => push('/'),
  goToWallets: () => push('/wallets'),
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(WalletsCreateView)
