import React from 'react'
import PropTypes from 'prop-types'

import EditKeyForm from './Form'
import EditKeyPassword from './Password'

import { STEPS } from '../modules/editKey'

const EditKey = props => (
  <div className='edit-key-view'>
    {(props.currentStep === STEPS.FORM) && <EditKeyForm {...props} />}
    {(props.currentStep === STEPS.PASSWORD) && <EditKeyPassword {...props} />}
  </div>
)

EditKey.propTypes = {
  setName: PropTypes.func.isRequired,
  setKnownDerivationPath: PropTypes.func.isRequired,
  setCustomDerivationPath: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  goToPasswordStep: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  validFields: PropTypes.shape({}).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  knownDerivationPath: PropTypes.string.isRequired,
  customDerivationPath: PropTypes.string.isRequired,
  currentStep: PropTypes.number.isRequired,
  isMnemonic: PropTypes.bool.isRequired,
}

export default EditKey
