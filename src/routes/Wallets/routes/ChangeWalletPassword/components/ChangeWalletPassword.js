import React from 'react'
import PropTypes from 'prop-types'

import { JButton, JTextInput } from 'components/base'

const ChangeWalletPassword = ({
  setCurrent,
  setNew,
  setConfirm,
  changePassword,
  invalidFields,
  password,
  newPassword,
  confirmPassword,
}) => {
  const fields = [
    { key: 'password', value: password, handler: setCurrent },
    { key: 'newPassword', value: newPassword, handler: setNew },
    { key: 'confirmPassword', value: confirmPassword, handler: setConfirm },
  ]

  return (
    <div className='change-wallet-password-view'>
      {fields.map(({ key, value, handler }) => (
        <JTextInput
          key={key}
          onValueChange={handler}
          value={value}
          name={`change-wallet-password-${key}`}
          errorMessage={invalidFields[key]}
          placeholder={i18n(`routes.changeWalletPassword.placeholder.${key}`)}
          editable
          secureTextEntry
        />
      ))}
      <JButton
        onClick={changePassword}
        label={i18n('routes.changeWalletPassword.buttonTitle')}
        blue
      />
    </div>
  )
}

ChangeWalletPassword.propTypes = {
  setCurrent: PropTypes.func.isRequired,
  setNew: PropTypes.func.isRequired,
  setConfirm: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  password: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
}

export default ChangeWalletPassword
