// @flow

import React from 'react'

import { JButton, JThumbnail } from 'components/base/__new__'

const RemoveWallet = ({ remove }: Props) => (
  <div className='content'>
    <div className='form'>
      <JThumbnail
        image='key'
        color='white'
        title='Remove current wallet'
        description={
          'All user data, including imported or generated ' +
          'private keys are stored locally, meaning your private'
        }
      />
      <div className='actions -center'>
        <JButton
          onClick={remove}
          text='Yes, remove wallet'
          color='blue'
          large
        />
      </div>
    </div>
  </div>
)

type Props = {
  remove: () => Dispatch,
}

export default RemoveWallet
