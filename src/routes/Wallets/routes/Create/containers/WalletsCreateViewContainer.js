// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  open,
  close,
  setMnemonicConfirm,
  setName,
  setPassword,
  setPasswordConfirm,
  setNextStep,
  setPrevStep,
} from '../modules/createWallet'

import WalletsCreateView from '../components/WalletsCreateView'

const mapStateToProps: Function = ({ createWallet }: State): CreateWalletData => createWallet

const mapDispatchToProps: {
  open: Function,
  close: Function,
  setMnemonicConfirm: Function,
  setName: Function,
  setPassword: Function,
  setPasswordConfirm: Function,
  setNextStep: Function,
  setPrevStep: Function,
  goToHome: Function,
  goToWallets: Function,
} = {
  open,
  close,
  setMnemonicConfirm,
  setName,
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
)(WalletsCreateView)
