// @flow

import React from 'react'

import { JText } from 'components/base/__new__'

const DerivedAddress = ({
  address,
  balance,
  onClick,
}: Props) => (
  <div
    onClick={onClick}
    className='DerivedAddress'
  >
    <div className='address'>
      <JText
        value={address}
        variants={['normal', 'bold', 'white']}
      />
    </div>
    <div className='balance'>
      <JText
        value={(balance === undefined) ? 'Loading' : `${balance.toFixed(3)} ETH`}
        variants={['normal', 'bold', 'white']}
      />
    </div>
  </div>
)

type Props = {
  address: Address,
  balance: number,
  onClick: Function,
}

export default DerivedAddress
