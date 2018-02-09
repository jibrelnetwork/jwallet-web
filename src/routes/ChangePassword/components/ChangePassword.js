import React from 'react'
import PropTypes from 'prop-types'

import { JButton, JTextInput } from 'components/base'

const ChangePassword = ({
  setPassword,
  setNewPassword,
  setConfirmPassword,
  change,
  invalidFields,
  password,
  newPassword,
  confirmPassword,
}) => {
  const fields = [
    { key: 'password', value: password, handler: setPassword },
    { key: 'newPassword', value: newPassword, handler: setNewPassword },
    { key: 'confirmPassword', value: confirmPassword, handler: setConfirmPassword },
  ]

  return (
    <div className='change-password-view'>
      {fields.map(({ key, value, handler }) => (
        <JTextInput
          key={key}
          onValueChange={handler}
          value={value}
          name={`change-password-${key}`}
          errorMessage={invalidFields[key]}
          placeholder={i18n(`modals.changePassword.placeholder.${key}`)}
          editable
          secureTextEntry
        />
      ))}
      <JButton onClick={change} label={i18n('routes.changePassword.buttonTitle')} blue />
    </div>
  )
}

ChangePassword.propTypes = {
  setPassword: PropTypes.func.isRequired,
  setNewPassword: PropTypes.func.isRequired,
  setConfirmPassword: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  password: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
}

export default ChangePassword
