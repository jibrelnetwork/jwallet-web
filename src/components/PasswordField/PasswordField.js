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
      placeholder={passwordPlaceholder || i18n('modals.createAccount.placeholder.password')}
      type='password'
      name='password-field-password'
      checked={withConfirm && isApproved}
    />
    {withConfirm && (
      <JInput
        onChange={onConfirmChange}
        color={color}
        value={passwordConfirm}
        errorMessage={passwordConfirmError}
        placeholder={passwordConfirmPlaceholder ||
          i18n('modals.createAccount.placeholder.passwordConfirm')}
        type='password'
        name='password-field-password-confirm'
        checked={isConfirmed}
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
  /* optional */
  color?: string,
  passwordPlaceholder?: string,
  passwordConfirmPlaceholder?: string,
  passwordConfirm?: string,
  passwordError?: string,
  passwordConfirmError?: string,
  withConfirm?: boolean,
}

PasswordField.defaultProps = {
  color: 'white',
  passwordConfirm: '',
  passwordError: '',
  passwordConfirmError: '',
  passwordPlaceholder: null,
  passwordConfirmPlaceholder: null,
  withConfirm: false,
}

export default PasswordField
