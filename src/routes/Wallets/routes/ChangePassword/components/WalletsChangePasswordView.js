// @flow

import React from 'react'

import PasswordField from 'components/PasswordField'
import ModalHeader from 'components/ModalHeader'
import { JButton, JInput } from 'components/base'

const WalletsChangePasswordView = ({
  setCurrent,
  setNew,
  setConfirm,
  changePassword,
  invalidFields,
  password,
  newPassword,
  confirmPassword,
}: Props) => (
  <div className='wallets-change-password-view'>
    <ModalHeader title='Change password' color='white' location='/wallets' />
    <div className='content'>
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
            color='blue'
            text='routes.changeWalletPassword.buttonTitle'
            wide
          />
        </div>
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

export default WalletsChangePasswordView
