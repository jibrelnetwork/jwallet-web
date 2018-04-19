// @flow

import React from 'react'

import JInput from 'components/base/JInput'

const PasswordField = ({
  onChange,
  onConfirmChange,
  message,
  isConfirmed,
  isApproved,
  password,
  passwordPlaceholder,
  passwordError,
  passwordConfirm,
  passwordConfirmPlaceholder,
  passwordConfirmError,
  color,
  withConfirm,
}: Props) => (
  <div className='password-field'>
    <JInput
      onChange={onChange}
      color={color}
      value={password}
      errorMessage={passwordError}
      infoMessage={withConfirm && message}
      placeholder={passwordPlaceholder || 'modals.createAccount.placeholder.password'}
      type='password'
      name='password-field-password'
      isChecked={withConfirm && isApproved}
    />
    {withConfirm && (
      <JInput
        onChange={onConfirmChange}
        color={color}
        value={passwordConfirm}
        errorMessage={passwordConfirmError}
        placeholder={passwordConfirmPlaceholder ||
          'modals.createAccount.placeholder.passwordConfirm'}
        type='password'
        name='password-field-password-confirm'
        isChecked={isConfirmed}
      />
    )}
  </div>
)

type Props = {
  onChange: Function,
  onConfirmChange: Function,
  password: string,
  message: string,
  isConfirmed: boolean,
  isApproved: boolean,
  color: string,
  passwordPlaceholder: string,
  passwordConfirmPlaceholder: string,
  passwordConfirm: string,
  passwordError: string,
  passwordConfirmError: string,
  withConfirm: boolean,
}

PasswordField.defaultProps = {
  onChange: () => {},
  onConfirmChange: () => {},
  password: '',
  message: '',
  isConfirmed: false,
  isApproved: false,
  color: 'white',
  passwordConfirm: '',
  passwordError: '',
  passwordConfirmError: '',
  passwordPlaceholder: null,
  passwordConfirmPlaceholder: null,
  withConfirm: false,
}

export default PasswordField
