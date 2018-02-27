// @flow

import React from 'react'

import { JButton, JTextInput } from 'components/base'

const PasswordStep = ({
  setPassword,
  setNextStep,
  invalidFields,
  password,
}: Props) => (
  <div className='edit-wallet-step-password'>
    <JTextInput
      onValueChange={setPassword}
      value={password}
      name='edit-wallet-password'
      errorMessage={invalidFields.password}
      placeholder={i18n('routes.editWallet.placeholder.password')}
      editable
      secureTextEntry
    />
    <JButton onClick={setNextStep} label={i18n('routes.editWallet.buttonTitle.confirm')} blue />
  </div>
)

type Props = {
  setPassword: (password: Password) => Dispatch,
  setNextStep: () => Dispatch,
  invalidFields: Object,
  password: Password,
}

export default PasswordStep
