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
  status,
  failedTest,
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
  password: string,
  status: string,
  failedTest: string,
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
  passwordPlaceholder: 'modals.createAccount.placeholder.password',
  passwordConfirmPlaceholder: 'modals.createAccount.placeholder.passwordConfirm',
  withConfirm: false,
}

export default PasswordField
