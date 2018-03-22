// @flow

import React from 'react'

import ModalHeader from 'components/__new__/ModalHeader'
import { JButton, JInput } from 'components/base/__new__'

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
    <div className='content'>
      <ModalHeader title='Change password' color='white' />
      <div className='form'>
        {fields.map(({ key, value, handler }) => (
          <JInput
            key={key}
            onChange={handler}
            value={value}
            name={`change-wallet-password-${key}`}
            errorMessage={invalidFields[key]}
            placeholder={i18n(`routes.changeWalletPassword.placeholder.${key}`)}
            type='password'
          />
        ))}
        <div className='actions'>
          <JButton
            onClick={changePassword}
            text={i18n('routes.changeWalletPassword.buttonTitle')}
            color='blue'
            large
          />
        </div>
      </div>
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
