// @flow

import React from 'react'

import { JButton, JTextInput } from 'components/base'

const PasswordStep = ({ setPassword, setNextStep, invalidFields, password }: Props) => (
  <div className='backup-wallet-view'>
    <JTextInput
      onValueChange={setPassword}
      value={password}
      name='backup-wallet-password'
      errorMessage={invalidFields.password}
      placeholder='Password'
      editable
      secureTextEntry
    />
    <JButton onClick={setNextStep} label='Confirm' blue />
  </div>
)

type Props = {
  setPassword: (password: Password) => Dispatch,
  setNextStep: () => Dispatch,
  invalidFields: Object,
  password: Password,
}

export default PasswordStep
