// @flow

import React from 'react'

import ignoreEvent from 'utils/eventHandlers/ignoreEvent'
import { JInput, JRaisedButton, JText } from 'components/base'

const informationStrArr = [
  'You will use this password to unlock and transfer your funds.',
  'Keep it secure!',
]

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

  <div className='wallet-password-step'>

    {(!isPasswordExists) && (
      <div className='information'>
        {informationStrArr.map((str: string) => (
          <div className='string' key={str}><JText size='large' color='white' value={str} /></div>
        ))}
      </div>
    )}

    <form className='form' onSubmit={ignoreEvent(onSubmit)()}>
      <JInput
        onChange={onChangePassword}
        value={valuePassword}
        errorMessage={invalidFields.password}
        color='white'
        placeholder='Payment password'
        name='wallets-create-password'
      />
      {!isPasswordExists && [
        <JInput
          key='confirm'
          onChange={onChangePasswordConfirm}
          value={valuePasswordConfirm}
          errorMessage={invalidFields.passwordConfirm}
          color='white'
          placeholder='Confirm payment password'
          name='wallets-create-password-confirm'
        />,
        <JInput
          key='hint'
          onChange={onChangePasswordHint}
          value={valuePasswordHint}
          errorMessage={invalidFields.passwordHint}
          color='white'
          placeholder='Password hint'
          name='wallets-create-password-hint'
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
