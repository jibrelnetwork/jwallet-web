import React from 'react'
import PropTypes from 'prop-types'

import { JButton, JTextInput } from 'components/base'

const PasswordStep = ({
  setPassword,
  setNextStep,
  invalidFields,
  password,
}) => (
  <div className='send-funds-password-step'>
    <JTextInput
      onValueChange={setPassword}
      value={password}
      name='send-funds-password'
      errorMessage={invalidFields.password}
      placeholder={i18n('routes.sendFunds.placeholder.password')}
      editable
      secureTextEntry
    />
    <JButton onClick={setNextStep} label={i18n('routes.sendFunds.buttonTitlePassword')} blue />
  </div>
)

PasswordStep.propTypes = {
  setPassword: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  password: PropTypes.string.isRequired,
}

export default PasswordStep
