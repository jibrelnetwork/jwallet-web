import React from 'react'
import PropTypes from 'prop-types'

import { STEPS } from '../modules/importKey'

import ImportKeyData from './Data'
import ImportKeyName from './Name'
import ImportKeyPassword from './Password'
import ImportKeyAssets from './Assets'

const ImportKey = props => (
  <div className='import-key-view'>
    {(props.currentStep === STEPS.DATA) && <ImportKeyData {...props} />}
    {(props.currentStep === STEPS.NAME) && <ImportKeyName {...props} />}
    {(props.currentStep === STEPS.PASSWORD) && <ImportKeyPassword {...props} />}
    {(props.currentStep === STEPS.ASSETS) && <ImportKeyAssets {...props} />}
  </div>
)

ImportKey.propTypes = {
  setKeyData: PropTypes.func.isRequired,
  setKnownDerivationPath: PropTypes.func.isRequired,
  setCustomDerivationPath: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setPasswordConfirm: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
  setPrevStep: PropTypes.func.isRequired,
  validFields: PropTypes.shape({}).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  data: PropTypes.string.isRequired,
  knownDerivationPath: PropTypes.string.isRequired,
  customDerivationPath: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  isMnemonic: PropTypes.bool.isRequired,
}

export default ImportKey
