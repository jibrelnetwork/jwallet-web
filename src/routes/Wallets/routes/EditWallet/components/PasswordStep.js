// @flow

import React from 'react'

import { JButton, JInput } from 'components/base/__new__'

const PasswordStep = ({
  setPassword,
  setNextStep,
  invalidFields,
  password,
}: Props) => (
  <div className='form'>
    <JInput
      onChange={setPassword}
      value={password}
      type='password'
      name='edit-wallet-password'
      errorMessage={invalidFields.password}
      placeholder={i18n('routes.editWallet.placeholder.password')}
    />
    <div className='actions'>
      <JButton
        onClick={setNextStep}
        text={'routes.editWallet.buttonTitle.confirm'}
        color='blue'
        large
      />
    </div>
  </div>
)

type Props = {
  setPassword: (password: Password) => Dispatch,
  setNextStep: () => Dispatch,
  invalidFields: Object,
  password: Password,
}

export default PasswordStep
