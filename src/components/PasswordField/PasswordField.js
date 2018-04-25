// @flow

import React from 'react'

import JInput from 'components/base/JInput'

import Indicator from './Indicator'

const statusMessageMap: Object = {
  'red': 'Too weak',
  'orange': 'Easily cracked',
  'yellow': 'Bit weak',
  'green': 'Not bad',
}

const getInfoMessage: Function = (status: string, failedTest: string): string => {
  return !(status && failedTest) ? '' : `${statusMessageMap[status]} (${failedTest})`
}

const PasswordField = ({
  onChange,
  onConfirmChange,
  color,
  status,
  password,
  failedTest,
  passwordError,
  passwordConfirm,
  passwordPlaceholder,
  passwordConfirmError,
  passwordConfirmPlaceholder,
  isApproved,
  isConfirmed,
  withConfirm,
}: Props) => (
  <div className='password-field'>
    <JInput
      onChange={onChange}
      color={color}
      value={password}
      errorMessage={passwordError}
      infoMessage={withConfirm && getInfoMessage(status, failedTest)}
      placeholder={passwordPlaceholder}
      type='password'
      name='password-field-password'
      isChecked={withConfirm && isApproved}
    />
    {withConfirm && (
      <div className='confirmation'>
        <Indicator password={password} status={status} />
        <JInput
          onChange={onConfirmChange}
          color={color}
          value={passwordConfirm}
          errorMessage={passwordConfirmError}
          placeholder={passwordConfirmPlaceholder}
          type='password'
          name='password-field-password-confirm'
          isChecked={isConfirmed}
        />
      </div>
    )}
  </div>
)

type Props = {
  onChange: Function,
  onConfirmChange: Function,
  status: string,
  password: string,
  failedTest: string,
  passwordError: string,
  passwordConfirm: string,
  passwordPlaceholder: string,
  passwordConfirmError: string,
  passwordConfirmPlaceholder: string,
  color: 'gray' | 'white',
  isApproved: boolean,
  isConfirmed: boolean,
  withConfirm: boolean,
}

PasswordField.defaultProps = {
  passwordPlaceholder: 'modals.createAccount.placeholder.password',
  passwordConfirmPlaceholder: 'modals.createAccount.placeholder.passwordConfirm',
}

export default PasswordField
