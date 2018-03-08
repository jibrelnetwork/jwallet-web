// @flow

import React from 'react'

import PasswordField from 'components/PasswordField'
import { JButton, JCallout } from 'components/base'

const PasswordStep = ({
  setPassword,
  setPasswordConfirm,
  setPrevStep,
  setNextStep,
  invalidFields,
  password,
  passwordConfirm,
}: Props) => (
  <div className='create-wallet-password-step'>
    <JCallout text='routes.createWallet.alert.password' />
    <PasswordField
      onPasswordChange={setPassword}
      onPasswordConfirmChange={setPasswordConfirm}
      password={password}
      passwordConfirm={passwordConfirm}
      passwordError={invalidFields.password}
      passwordConfirmError={invalidFields.passwordConfirm}
      withConfirm
    />
    <JButton onClick={setPrevStep} label={i18n('routes.createWallet.buttonTitle.prevStep')} blue />
    <JButton onClick={setNextStep} label={i18n('routes.createWallet.buttonTitle.finish')} blue />
  </div>
)

type Props = {
  setPassword: (password: Password) => Dispatch,
  setPasswordConfirm: (passwordConfirm: Password) => Dispatch,
  setNextStep: () => Dispatch,
  setPrevStep: () => Dispatch,
  invalidFields: Object,
  password: Password,
  passwordConfirm: Password,
}

export default PasswordStep
