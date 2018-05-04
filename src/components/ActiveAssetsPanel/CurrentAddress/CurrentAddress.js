// @flow

import React from 'react'
import { JFlatButton, JIcon, JText } from 'react-components'

const CurrentAddress = ({ goToWallets, address, isReadOnly }: Props) => (
  <div className='current-address'>
    {address && (
      <div className='address'>
        <div className='label'>
          <div className='text'>
            <JText value='Current address' color='gray' />
          </div>
          {isReadOnly && <JIcon name='eye' size='small' color='gray' />}
        </div>
        <div className='value'>
          <JText value={address} color={isReadOnly ? 'gray' : 'blue'} weight='bold' />
        </div>
      </div>
    )}
    <div className='logout'>
      <JFlatButton
        onClick={goToWallets}
        iconColor='gray'
        iconName='logout'
        iconSize='medium'
        isOpaque
      />
    </div>
  </div>
)

type Props = {
  goToWallets: Function,
  address: ?Address,
  isReadOnly: boolean,
}

export default CurrentAddress
