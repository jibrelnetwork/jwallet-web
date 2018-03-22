import React from 'react'
import PropTypes from 'prop-types'

import { JButton, JInput } from 'components/base/__new__'

const PasswordStep = ({
  setPassword,
  setNextStep,
  invalidFields,
  password,
}) => (
  <div className='form'>
    <JInput
      onChange={setPassword}
      value={password}
      errorMessage={invalidFields.password}
      placeholder={i18n('routes.sendFunds.placeholder.password')}
      type='password'
      name='send-funds-password'
    />
    <div className='actions'>
      <JButton onClick={setNextStep} text='routes.sendFunds.buttonTitlePassword' color='white' />
    </div>
  </div>
)

PasswordStep.propTypes = {
  setPassword: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  password: PropTypes.string.isRequired,
}

export default PasswordStep
