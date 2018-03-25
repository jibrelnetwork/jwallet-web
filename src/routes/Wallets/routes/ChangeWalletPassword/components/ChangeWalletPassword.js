// @flow

import React from 'react'

import PasswordField from 'components/PasswordField'
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
}: Props) => (
  <div className='content'>
    <div className='modal-header-wrapper'>
      <ModalHeader title='Change password' color='white' />
    </div>
    <div className='form'>
      <JInput
        onChange={setCurrent}
        value={password}
        errorMessage={invalidFields.password}
        placeholder={i18n('routes.changeWalletPassword.placeholder.password')}
        type='password'
        name='current-password'
      />
      <PasswordField
        onPasswordChange={setNew}
        onPasswordConfirmChange={setConfirm}
        password={newPassword}
        passwordConfirm={confirmPassword}
        passwordError={invalidFields.newPassword}
        passwordConfirmError={invalidFields.confirmPassword}
        withConfirm
      />
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
