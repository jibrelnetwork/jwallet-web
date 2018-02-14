import React from 'react'
import PropTypes from 'prop-types'

import { JButton, JTextInput } from 'components/base'

const Name = ({
  setName,
  setPrevStep,
  setNextStep,
  invalidFields,
  name,
}) => (
  <div className='create-key-name-step'>
    <div style={{ margin: '20px' }}>{i18n('routes.createKey.alert.name')}</div>
    <JTextInput
      onValueChange={setName}
      name='create-key-name'
      placeholder={i18n('routes.createKey.placeholder.name')}
      value={name}
      errorMessage={invalidFields.name}
      editable
    />
    <JButton onClick={setPrevStep} label={i18n('routes.createKey.buttonTitle.prevStep')} blue />
    <JButton
      onClick={setNextStep}
      label={i18n('routes.createKey.buttonTitle.nextStep')}
      blue
    />
  </div>
)

Name.propTypes = {
  setName: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
  setPrevStep: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
}

export default Name
