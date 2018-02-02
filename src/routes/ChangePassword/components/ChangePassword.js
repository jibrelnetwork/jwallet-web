import React from 'react'
import PropTypes from 'prop-types'

import JTextInput from 'components/base/JTextInput'

const ChangePassword = ({
  setOldPassword,
  setNewPassword,
  setConfirmPassword,
  // change,
  invalidFields,
  oldPassword,
  newPassword,
  confirmPassword,
}) => {
  const fields = [
    { key: 'password', value: oldPassword, handler: setOldPassword },
    { key: 'newPassword', value: newPassword, handler: setNewPassword },
    { key: 'confirmPassword', value: confirmPassword, handler: setConfirmPassword },
  ]

  return (
    <div className='change-password-view'>
      {fields.map(({ key, value, handler }) => (
        <JTextInput
          key={key}
          onValueChange={handler}
          name={`change-password-${key}`}
          placeholder={i18n(`modals.changePassword.placeholder.${key}`)}
          value={value}
          errorMessage={invalidFields[key]}
          editable
        />
      ))}
    </div>
  )
}

ChangePassword.propTypes = {
  setOldPassword: PropTypes.func.isRequired,
  setNewPassword: PropTypes.func.isRequired,
  setConfirmPassword: PropTypes.func.isRequired,
  // change: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  oldPassword: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
}

export default ChangePassword
