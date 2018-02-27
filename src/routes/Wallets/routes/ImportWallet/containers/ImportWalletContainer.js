// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

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

import ImportWallet from '../components/ImportWallet'

const mapStateToProps = ({ importWallet }: State): ImportWalletData => importWallet

const mapDispatchToProps = {
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
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(ImportWallet)
