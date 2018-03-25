// @flow

import React from 'react'
import { Link } from 'react-router'

import WalletHeader from 'components/__new__/WalletHeader'

const Start = () => (
  <div className='content'>
    <div className='wallet-header-wrapper'>
      <WalletHeader />
    </div>
    <div>
      <div style={{ marginBottom: '40px' }}>
        {'Create a new key pair or import anexisting one to get started'}
      </div>
      <Link to='/wallets/create' style={{ display: 'block', marginBottom: '10px' }}>
        {'Create new wallet'}
      </Link>
      <Link to='/wallets/import'>
        {'Import wallet'}
      </Link>
    </div>
  </div>
)

export default Start
