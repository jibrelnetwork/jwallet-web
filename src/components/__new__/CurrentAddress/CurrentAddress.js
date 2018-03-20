// @flow

import React from 'react'
import { Link } from 'react-router'

import JIcon from 'components/base/__new__/JIcon'

const CurrentAddress = ({ address }: Props) => (
  <div className='current-address'>
    {address && (
      <div className='address'>
        <div className='label'>{'Current address'}</div>
        <div className='value'>{address}</div>
      </div>
    )}
    <Link className='link' to='/wallets'>
      <JIcon size='medium' name='logout' />
    </Link>
  </div>
)

type Props = {
  address: ?Address,
}

export default CurrentAddress
