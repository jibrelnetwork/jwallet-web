// @flow

import React from 'react'

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
}: Props) => {
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

type Props = {
  setCurrent: (password: Password) => Dispatch,
  setNew: (newPassword: Password) => Dispatch,
  setConfirm: (confirmPassword: Password) => Dispatch,
  changePassword: () => Dispatch,
  invalidFields: Object,
  password: Password,
  newPassword: Password,
  confirmPassword: Password,
}

export default ChangeWalletPassword
