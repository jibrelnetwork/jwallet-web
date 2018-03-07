import React from 'react'
import PropTypes from 'prop-types'

import { JButton, JTextInput } from 'components/base'

const Password = ({
  setPassword,
  setNextStep,
  invalidFields,
  password,
}) => (
  <div className='send-funds-password-form'>
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

Password.propTypes = {
  setPassword: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  password: PropTypes.string.isRequired,
}

export default Password
