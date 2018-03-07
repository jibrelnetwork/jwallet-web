import React from 'react'
import { Link } from 'react-router'

const Start = () => (
  <div className='start-view'>
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
)

export default Start
