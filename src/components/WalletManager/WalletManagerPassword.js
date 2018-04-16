// @flow

import React from 'react'

import { JFlatButton, JIcon } from 'components/base'

const WalletManagerPassword = ({
  setPassword,
  setActive,
  // invalidFields,
  password,
  icon,
}: Props) => (
  <div className='password'>
    <div className='content'>
      <div className='icon'>
        <JIcon name={icon} size='medium' />
      </div>
      <div className='input'>
        <input
          type='password'
          value={password}
          onChange={setPassword}
          placeholder='Type your password'
        />
      </div>
    </div>
    <div className='arrow'>
      <JFlatButton onClick={setActive} iconName='arrow' iconSize='medium' />
    </div>
  </div>
)

type Props = {
  setPassword: (password: Password) => Dispatch,
  setActive: () => Dispatch,
  invalidFields: Object,
  password: Password,
  icon: string,
}

export default WalletManagerPassword
