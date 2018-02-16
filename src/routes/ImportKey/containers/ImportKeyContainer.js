import { compose } from 'ramda'
import { connect } from 'react-redux'
import lifecycle from 'recompose/lifecycle'

import isKeystoreInitialised from 'utils/isKeystoreInitialised'

import {
  open,
  close,
  setKeyData,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setName,
  setPassword,
  setPasswordConfirm,
  setNextStep,
  setPrevStep,
} from '../modules/importKey'

import ImportKey from '../components/ImportKey'

const mapStateToProps = ({ importKey, keystore }) => ({
  ...importKey,
  isInitialized: isKeystoreInitialised(keystore),
})

const mapDispatchToProps = {
  open,
  close,
  setKeyData,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setName,
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
)(ImportKey)
