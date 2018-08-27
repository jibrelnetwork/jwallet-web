// @flow

import React from 'react'
import { JThumbnail } from 'react-components'

const DigitalAssetsEmpty = ({ color }: Props) => (
  <div className='digital-assets-empty'>
    <JThumbnail
      image='cloud'
      color={(color === 'white') ? 'gray' : 'white'}
      description='There are no Digital Assets to show'
    />
  </div>
)

type Props = {
  color: 'white' | 'blue',
}

export default DigitalAssetsEmpty
