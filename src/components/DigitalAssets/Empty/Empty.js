// @flow

import React from 'react'

import JThumbnail from 'components/base/JThumbnail'

const DigitalAssetsEmpty = () => (
  <div className='digital-assets-empty'>
    <JThumbnail
      image='cloud'
      color='gray'
      description='There are no Digital Assets to show'
    />
  </div>
)

export default DigitalAssetsEmpty
