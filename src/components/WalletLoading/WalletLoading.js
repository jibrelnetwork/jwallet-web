// @flow

import React from 'react'

import JLoader from 'components/base/JLoader'
import JCard from 'components/base/JCard'

const WalletLoading = () => (
  <JCard color='blue'>
    <div className='wallet-loading'>
      <JLoader color='white' />
    </div>
  </JCard>
)

export default WalletLoading
