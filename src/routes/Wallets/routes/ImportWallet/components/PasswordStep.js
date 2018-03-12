// @flow

import React from 'react'

import PasswordField from 'components/PasswordField'
import { JButton } from 'components/base'
import { JCallout } from 'components/base/__new__'

const PasswordStep = ({
  setPassword,
  setPasswordConfirm,
  setPrevStep,
  setNextStep,
  invalidFields,
  password,
  passwordConfirm,
}: Props) => (
  <div className='import-wallet-password-step'>
    <JCallout text='routes.importWallet.alert.password' />
    <PasswordField
      onPasswordChange={setPassword}
      onPasswordConfirmChange={setPasswordConfirm}
      password={password}
      passwordConfirm={passwordConfirm}
      passwordError={invalidFields.password}
      passwordConfirmError={invalidFields.passwordConfirm}
      withConfirm
    />
    <JButton onClick={setPrevStep} label={i18n('routes.importWallet.buttonTitle.prevStep')} blue />
    <JButton onClick={setNextStep} label={i18n('routes.importWallet.buttonTitle.nextStep')} blue />
  </div>
)

type Props = {
  setPassword: (password: string) => Dispatch,
  setPasswordConfirm: (passwordConfirm: string) => Dispatch,
  setNextStep: () => Dispatch,
  setPrevStep: () => Dispatch,
  invalidFields: Object,
  password: string,
  passwordConfirm: string,
}

export default PasswordStep
