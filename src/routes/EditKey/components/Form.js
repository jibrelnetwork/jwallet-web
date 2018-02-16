import React from 'react'
import PropTypes from 'prop-types'

import { JButton, JTextInput } from 'components/base'

import FormDerivationPath from './DerivationPath'

const Form = ({
  setName,
  setKnownDerivationPath,
  setCustomDerivationPath,
  goToPasswordStep,
  remove,
  validFields,
  invalidFields,
  address,
  name,
  knownDerivationPath,
  customDerivationPath,
  isMnemonic,
}) => (
  <div className='edit-key-form'>
    <JTextInput
      name='edit-key-address'
      placeholder={i18n('routes.editKey.placeholder.address')}
      value={address}
    />
    <JTextInput
      onValueChange={setName}
      name='edit-key-name'
      placeholder={i18n('routes.editKey.placeholder.name')}
      value={name}
      errorMessage={invalidFields.name}
      successMessage={validFields.name}
      editable
    />
    {isMnemonic && (
      <FormDerivationPath
        setKnownDerivationPath={setKnownDerivationPath}
        setCustomDerivationPath={setCustomDerivationPath}
        validFields={validFields}
        invalidFields={invalidFields}
        knownDerivationPath={knownDerivationPath}
        customDerivationPath={customDerivationPath}
      />
    )}
    <JButton onClick={goToPasswordStep} label={i18n('routes.editKey.buttonTitle.form')} blue />
    <JButton onClick={remove} label={i18n('routes.editKey.buttonTitle.remove')} blue />
  </div>
)

Form.propTypes = {
  setName: PropTypes.func.isRequired,
  setKnownDerivationPath: PropTypes.func.isRequired,
  setCustomDerivationPath: PropTypes.func.isRequired,
  goToPasswordStep: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  validFields: PropTypes.shape({}).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  knownDerivationPath: PropTypes.string.isRequired,
  customDerivationPath: PropTypes.string.isRequired,
  isMnemonic: PropTypes.bool.isRequired,
}

export default Form
