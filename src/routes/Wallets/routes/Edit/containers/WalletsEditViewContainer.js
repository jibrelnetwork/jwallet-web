// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import {
  open,
  close,
  setName,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setPassword,
  setNextStep,
} from '../modules/editWallet'

import WalletsEditView from '../components/WalletsEditView'

const mapStateToProps: Function = ({ editWallet }: State): EditWalletData => editWallet

const mapDispatchToProps: {
  open: Function,
  close: Function,
  setName: Function,
  setKnownDerivationPath: Function,
  setCustomDerivationPath: Function,
  setPassword: Function,
  setNextStep: Function,
} = {
  open,
  close,
  setName,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setPassword,
  setNextStep,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open(this.props.params.keyId) },
    componentWillUnmount() { this.props.close() },
  }),
)(WalletsEditView)
