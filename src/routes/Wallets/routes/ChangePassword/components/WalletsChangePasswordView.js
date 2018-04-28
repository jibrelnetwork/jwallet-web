// @flow

import React from 'react'

import PasswordField from 'components/PasswordField'
import ModalHeader from 'components/ModalHeader'
import { JInput, JRaisedButton } from 'components/base'

const WalletsChangePasswordView = ({
  setNew,
  setConfirm,
  setCurrent,
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
          color='white'
          type='password'
          name='current-password'
          placeholder='routes.changeWalletPassword.placeholder.password'
        />
        <PasswordField
          onPasswordChange={setNew}
          onPasswordConfirmChange={setConfirm}
          password={newPassword}
          passwordConfirm={confirmPassword}
          passwordError={invalidFields.newPassword}
          passwordConfirmError={invalidFields.confirmPassword}
          color='white'
          withConfirm
        />
        <div className='actions'>
          <JRaisedButton
            onClick={changePassword}
            color='blue'
            label='routes.changeWalletPassword.buttonTitle'
            isWide
          />
        </div>
      </div>
    </div>
  </div>
)

type Props = {
  setNew: Function,
  setConfirm: Function,
  setCurrent: Function,
  changePassword: Function,
  invalidFields: FormFields,
  password: string,
  newPassword: string,
  confirmPassword: string,
}

export default WalletsChangePasswordView
