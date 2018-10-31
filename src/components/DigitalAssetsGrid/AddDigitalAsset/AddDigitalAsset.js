// @flow

import React from 'react'

import { JIcon } from 'components/base'
import { handle } from 'utils/eventHandlers'

type Props = {
  onClick: () => void
}

const AddAsset = ({ onClick }: Props) => (
  <div className='add-asset' onClick={handle(onClick)()}>
    <div className='icon'>
      <JIcon
        size='medium'
        color='gray'
        name='close-header'
      />
    </div>
  </div>
)

export default AddAsset
