// @flow

import React from 'react'

import PasswordField from 'components/PasswordField'

const WalletPassword = ({
  setPassword,
  setActive,
  invalidFields,
  password,
}: Props) => (
  <div className='wallet-password' style={{ display: 'flex' }}>
    <PasswordField
      onPasswordChange={setPassword}
      password={password}
      passwordError={invalidFields.password}
    />
    <div onClick={setActive} style={{ marginLeft: '20px' }}>gooo!</div>
  </div>
)

type Props = {
  setPassword: (password: Password) => Dispatch,
  setActive: () => Dispatch,
  invalidFields: Object,
  password: Password,
}

export default WalletPassword
