// @flow

import React from 'react'

import JFlatButton from 'components/base/JFlatButton'

const CurrentAddress = ({ goToWallets, address }: Props) => (
  <div className='current-address'>
    {address && (
      <div className='address'>
        <div className='label'>{'Current address'}</div>
        <div className='value'>{address}</div>
      </div>
    )}
    <div className='logout'>
      <JFlatButton
        onClick={goToWallets}
        iconName='logout'
        iconSize='medium'
        iconColor='gray'
        transparent
      />
    </div>
  </div>
)

type Props = {
  goToWallets: Function,
  address: ?Address,
}

CurrentAddress.defaultProps = {
  goToWallets: () => {},
  address: null,
}

export default CurrentAddress
