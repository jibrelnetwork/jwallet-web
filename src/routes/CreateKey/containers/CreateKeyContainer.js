import { compose } from 'ramda'
import { connect } from 'react-redux'
import lifecycle from 'recompose/lifecycle'

import isKeystoreInitialised from 'utils/isKeystoreInitialised'

import {
  open,
  close,
  setMnemonicConfirm,
  setName,
  setPassword,
  setPasswordConfirm,
  setNextStep,
  setPrevStep,
} from '../modules/createKey'

import CreateKey from '../components/CreateKey'

const mapStateToProps = ({ createKey, keystore }) => ({
  ...createKey,
  isInitialized: isKeystoreInitialised(keystore),
})

const mapDispatchToProps = {
  open,
  close,
  setMnemonicConfirm,
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
)(CreateKey)
