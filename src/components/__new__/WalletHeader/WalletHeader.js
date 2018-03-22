// TODO: move JICon with rounded border to separate component

/* @flow */

import React from 'react'

import { JLogo, JIcon } from '../../base/__new__'

const WalletHeader = ({ onButtonClick }: Props) => (
  <div className='walletHeader' >
    <div className='logo'>
      <JLogo />
    </div>
    <div
      className='icon'
      onClick={onButtonClick}
    >
      <JIcon
        name='arrow-popup-white'
        size='medium'
      />
    </div>
  </div>
)

type Props = {
  color: 'white' | 'gray',
  onLogoClick: Function,
  onButtonClick: Function,
}

export default WalletHeader
