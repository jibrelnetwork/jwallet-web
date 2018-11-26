// @flow

import React from 'react'

import OverlayNotification from 'components/OverlayNotification'

function DigitalAssetsGridEmpty() {
  return (
    <OverlayNotification
      color='gray'
      image='screen-search'
      description='There are no Digital Assets to show'
      isTransparent
    />
  )
}

export default DigitalAssetsGridEmpty
