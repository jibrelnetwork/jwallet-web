import React from 'react'
import PropTypes from 'prop-types'

import { JButton, JTextInput } from 'components/base'

const Name = ({
  setName,
  setPrevStep,
  setNextStep,
  validFields,
  invalidFields,
  name,
}) => (
  <div className='import-key-name-step'>
    <div style={{ margin: '20px' }}>{i18n('routes.importKey.alert.name')}</div>
    <JTextInput
      onValueChange={setName}
      name='import-key-name'
      placeholder={i18n('routes.importKey.placeholder.name')}
      value={name}
      errorMessage={invalidFields.name}
      successMessage={validFields.name}
      editable
    />
    <JButton onClick={setPrevStep} label={i18n('routes.importKey.buttonTitle.prevStep')} blue />
    <JButton
      onClick={setNextStep}
      label={i18n('routes.importKey.buttonTitle.nextStep')}
      blue
    />
  </div>
)

Name.propTypes = {
  setName: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
  setPrevStep: PropTypes.func.isRequired,
  validFields: PropTypes.shape({}).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
}

export default Name
