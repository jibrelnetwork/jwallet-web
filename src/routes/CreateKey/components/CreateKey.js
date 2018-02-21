import React from 'react'
import PropTypes from 'prop-types'

import { STEPS } from '../modules/createKey'

import CreateKeyMnemonic from './Mnemonic'
import CreateKeyMnemonicConfirm from './MnemonicConfirm'
import CreateKeyName from './Name'
import CreateKeyPassword from './Password'
import CreateKeyAssets from './Assets'

const CreateKey = props => (
  <div className='create-key-view'>
    {(props.currentStep === STEPS.MNEMONIC) && <CreateKeyMnemonic {...props} />}
    {(props.currentStep === STEPS.MNEMONIC_CONFIRM) && <CreateKeyMnemonicConfirm {...props} />}
    {(props.currentStep === STEPS.NAME) && <CreateKeyName {...props} />}
    {(props.currentStep === STEPS.PASSWORD) && <CreateKeyPassword {...props} />}
    {(props.currentStep === STEPS.ASSETS) && <CreateKeyAssets {...props} />}
  </div>
)

CreateKey.propTypes = {
  setMnemonicConfirm: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setPasswordConfirm: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
  setPrevStep: PropTypes.func.isRequired,
  validFields: PropTypes.shape({}).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  mnemonic: PropTypes.string.isRequired,
  mnemonicConfirm: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  isInitialized: PropTypes.bool.isRequired,
}

export default CreateKey
