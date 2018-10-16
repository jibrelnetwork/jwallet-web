// @flow

import React from 'react'

import ignoreEvent from 'utils/eventHandlers/ignoreEvent'
import { JInput, JRaisedButton, JText } from 'components/base'

type Props = {|
  +onSubmit: Function,
  +onChangePassword: Function,
  +onChangePasswordHint: Function,
  +onChangePasswordConfirm: Function,
  +invalidFields: FormFields,
  +valuePassword: string,
  +valuePasswordHint: string,
  +valuePasswordConfirm: string,
  +title: array,
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
  title,
  isLoading,
  isPasswordExists,
}: Props) => (

  <div className='wallet-password-step'>
    {!isPasswordExists && (
      <div className='information'>
        {title.map((str: array) => (
          <div className='string' key={str}>
            <JText size='large' color='white' value={str} whiteSpace='wrap' align='center' />
          </div>
        ))}
      </div>
    )}
    <form className='form' onSubmit={ignoreEvent(onSubmit)()}>
      <JInput
        onChange={onChangePassword}
        value={valuePassword}
        errorMessage={invalidFields.password}
        color='white'
        placeholder='Password'
        name='wallet-password'
        type='password'
      />
      {!isPasswordExists && [
        <JInput
          key='confirm'
          onChange={onChangePasswordConfirm}
          value={valuePasswordConfirm}
          errorMessage={invalidFields.passwordConfirm}
          color='white'
          placeholder='Confirm payment password'
          name='wallet-password-confirm'
          type='password'
        />,
        <JInput
          key='hint'
          onChange={onChangePasswordHint}
          value={valuePasswordHint}
          errorMessage={invalidFields.passwordHint}
          color='white'
          placeholder='Password hint'
          name='wallet-password-hint'
        />,
      ]}
      <div className='actions'>
        <JRaisedButton
          onClick={onSubmit}
          color='white'
          labelColor='blue'
          loaderColor='white'
          label='Create wallet'
          isLoading={isLoading}
        />
      </div>
    </form>
  </div>
)

export default WalletPasswordStep
