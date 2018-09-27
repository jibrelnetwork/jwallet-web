// @flow

import React from 'react'
import classNames from 'classnames'

import { JFlatButton, JIcon, JText } from 'components/base'

const WalletPassword = ({ setActive, setPassword, errorMessage, iconName, password }: Props) => (
  <div className='wallet-password'>
    <div className='content'>
      <div className='icon'>
        <JIcon name={iconName} size='medium' color='white' />
      </div>
      <div className={classNames('field', errorMessage && '-error')}>
        <input
          onChange={setPassword}
          value={password}
          type='password'
          className='input'
          placeholder='Type your password'
        />
        {errorMessage && (
          <div className='error'>
            <JText value={errorMessage} color='red' size='small' />
          </div>
        )}
      </div>
    </div>
    <div className='arrow'>
      <JFlatButton onClick={setActive} iconName='arrow' iconSize='medium' iconColor='white' />
    </div>
  </div>
)

type Props = {
  setActive: Function,
  setPassword: Function,
  password: string,
  iconName: string,
  errorMessage: ?string,
}

export default WalletPassword
