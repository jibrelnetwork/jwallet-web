// @flow

import React from 'react'

import WalletHeader from 'components/WalletHeader'
import { JButton, JThumbnail } from 'components/base'

const NotFound = ({ goToIndex }: Props) => (
  <div className='not-found-view'>
    <WalletHeader />
    <div className='content'>
      <JThumbnail
        color='white'
        image='man'
        title='404. Page not found'
        description={'All user data, including imported or generated ' +
          'private keys are stored locally, meaning your private'}
      />
      <JButton onClick={goToIndex} text='Go to the front' color='blue' large />
    </div>
  </div>
)

type Props = {
  goToIndex: Function,
}

export default NotFound
