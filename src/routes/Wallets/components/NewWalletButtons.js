// @flow

import React from 'react'
import { Link } from 'react-router'

const NewWalletButtons = () => (
  <div className='new-wallet-buttons' style={{ margin: '40px' }}>
    <Link to='/wallets/create' style={{ display: 'block', marginBottom: '10px' }}>
      {'Create new wallet'}
    </Link>
    <Link to='/wallets/import'>
      {'Import wallet'}
    </Link>
  </div>
)

export default NewWalletButtons
