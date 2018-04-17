// @flow

import React from 'react'

import ModalHeader from 'components/ModalHeader'
import { JButton, JThumbnail } from 'components/base'

const WalletsRemoveView = ({ remove }: Props) => (
  <div className='wallets-remove-view'>
    <ModalHeader title='Remove wallet' color='white' location='/wallets' />
    <div className='content'>
      <div className='form'>
        <JThumbnail
          image='key'
          color='white'
          title='Remove current wallet'
          description={'All user data, including imported or generated ' +
            'private keys are stored locally, meaning your private'}
        />
        <div className='actions'>
          <JButton onClick={remove} text='Yes, remove wallet' color='blue' wide />
        </div>
      </div>
    </div>
  </div>
)

type Props = {
  remove: () => Dispatch,
}

WalletsRemoveView.defaultProps = {
  remove: () => {},
}

export default WalletsRemoveView
