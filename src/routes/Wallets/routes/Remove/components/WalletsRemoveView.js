// @flow

import React from 'react'

import ModalHeader from 'components/ModalHeader'
import { JThumbnail, JRaisedButton } from 'components/base'

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
          <JRaisedButton
            onClick={remove}
            label='Yes, remove wallet'
            color='blue'
            isWide
          />
        </div>
      </div>
    </div>
  </div>
)

type Props = {
  remove: Function,
}

export default WalletsRemoveView
