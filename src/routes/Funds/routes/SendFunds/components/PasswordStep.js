import React from 'react'
import PropTypes from 'prop-types'

import JTextInput from 'components/base/JTextInput'
import JButton from 'components/base/__new__/JButton'

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
    <JButton onClick={setNextStep} text='routes.sendFunds.buttonTitlePassword' color='white' />
  </div>
)

PasswordStep.propTypes = {
  setPassword: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  password: PropTypes.string.isRequired,
}

export default PasswordStep
