// TODO: Replace button styles, add title and description

/* @flow */

import React from 'react'

import { WalletHeader } from '../../components'
import { JButton, JThumbnail } from '../../components/base'

const NotFound = () => (
  <div className='NotFound'>
    <div className='header'>
      <WalletHeader />
    </div>
    <div className='content'>
      <JThumbnail
        color='white'
        image='man-blue'
        title='404. Page not found'
        description={`All user data, including imported or generated 
private keys are stored locally, meaning your private`}
      />
    </div>
    <div className='button'>
      <JButton
        text='Go to the front'
        color='blue'
        large
      />
    </div>
  </div>
)

export default NotFound
