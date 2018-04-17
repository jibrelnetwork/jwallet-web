// @flow

import React from 'react'
import classNames from 'classnames'

import { JFlatButton, JIcon, JText } from 'components/base'

const WalletManagerPassword = ({
  setPassword,
  setActive,
  invalidFields,
  password,
  icon,
}: Props) => (
  <div className='wallet-manager-password'>
    <div className='content'>
      <div className='icon'>
        <JIcon name={icon} size='medium' />
      </div>
      <div className={classNames('input', invalidFields.password && '-error')}>
        <input
          type='password'
          value={password}
          onChange={setPassword}
          placeholder='Type your password'
        />
        {invalidFields.password && (
          <div className='error'>
            <JText value={invalidFields.password} color='red' size='small' />
          </div>
        )}
      </div>
    </div>
    <div className='arrow'>
      <JFlatButton onClick={setActive} iconName='arrow' iconSize='medium' />
    </div>
  </div>
)

type Props = {
  setPassword: (password: string) => Dispatch,
  setActive: () => Dispatch,
  invalidFields: Object,
  password: string,
  icon: string,
}

WalletManagerPassword.defaultProps = {
  setPassword: () => {},
  setActive: () => {},
  invalidFields: {},
  password: '',
  icon: '',
}

export default WalletManagerPassword
