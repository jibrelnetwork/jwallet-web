import React from 'react'
import PropTypes from 'prop-types'

import PasswordField from 'components/PasswordField'
import { JButton, JTextInput } from 'components/base'

const Password = ({
  setPassword,
  setPasswordConfirm,
  setPrevStep,
  setNextStep,
  validFields,
  invalidFields,
  password,
  passwordConfirm,
  isInitialized,
}) => (
  <div className='create-key-password-step'>
    <div style={{ margin: '20px' }}>{i18n('routes.createKey.alert.password')}</div>
    {isInitialized ? (
      <JTextInput
        onValueChange={setPassword}
        name='create-key-password'
        placeholder={i18n('routes.createKey.placeholder.password')}
        value={password}
        errorMessage={invalidFields.password}
        successMessage={validFields.password}
        editable
        secureTextEntry
      />
    ) : (
      <PasswordField
        onPasswordChange={setPassword}
        onPasswordConfirmChange={setPasswordConfirm}
        password={password}
        passwordConfirm={passwordConfirm}
        passwordError={invalidFields.password}
        passwordConfirmError={invalidFields.passwordConfirm}
        withConfirm
      />
    )}
    <JButton onClick={setPrevStep} label={i18n('routes.createKey.buttonTitle.prevStep')} blue />
    <JButton
      onClick={setNextStep}
      label={i18n(`routes.createKey.buttonTitle.${isInitialized ? 'finish' : 'nextStep'}`)}
      blue
    />
  </div>
)

Password.propTypes = {
  setPassword: PropTypes.func.isRequired,
  setPasswordConfirm: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
  setPrevStep: PropTypes.func.isRequired,
  validFields: PropTypes.shape({}).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  isInitialized: PropTypes.bool.isRequired,
}

export default Password
