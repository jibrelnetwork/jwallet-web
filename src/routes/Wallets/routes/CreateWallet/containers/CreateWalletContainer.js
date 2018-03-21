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

import CreateWallet from '../components/CreateWallet'

const mapStateToProps = ({ createWallet }: State): CreateWalletData => createWallet

const mapDispatchToProps = {
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
)(CreateWallet)
