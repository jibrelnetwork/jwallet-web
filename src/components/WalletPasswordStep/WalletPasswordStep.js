// @flow

import React from 'react'

import ignoreEvent from 'utils/eventHandlers/ignoreEvent'
import { JInput, JRaisedButton } from 'components/base'

type Props = {|
  +onSubmit: Function,
  +onChangePassword: Function,
  +onChangePasswordHint: Function,
  +onChangePasswordConfirm: Function,
  +invalidFields: FormFields,
  +valuePassword: string,
  +valuePasswordHint: string,
  +valuePasswordConfirm: string,
  +isLoading: boolean,
  +isPasswordExists: boolean,
|}

const WalletPasswordStep = ({
  onSubmit,
  onChangePassword,
  onChangePasswordHint,
  onChangePasswordConfirm,
  invalidFields,
  valuePassword,
  valuePasswordHint,
  valuePasswordConfirm,
  isLoading,
  isPasswordExists,
}: Props) => (
  <form className='wallet-password-step' onSubmit={ignoreEvent(onSubmit)()}>
    <JInput
      onChange={onChangePassword}
      value={valuePassword}
      errorMessage={invalidFields.password}
      color='white'
      name='wallet-password'
      placeholder='Payment password'
    />
    {!isPasswordExists && [
      <JInput
        key='confirm'
        onChange={onChangePasswordConfirm}
        value={valuePasswordConfirm}
        errorMessage={invalidFields.passwordConfirm}
        color='white'
        name='wallet-password-confirm'
        placeholder='Confirm payment password'
      />,
      <JInput
        key='hint'
        onChange={onChangePasswordHint}
        value={valuePasswordHint}
        errorMessage={invalidFields.passwordHint}
        color='white'
        name='wallet-password-hint'
        placeholder='Password hint'
      />,
    ]}
    <div className='actions'>
      <JRaisedButton
        onClick={onSubmit}
        color='blue'
        loaderColor='white'
        label='Create wallet'
        isLoading={isLoading}
        isWide
      />
    </div>
  </form>
)

export default WalletPasswordStep
