// @flow

import React from 'react'
import { t } from 'ttag'

import OverlayNotification from 'components/OverlayNotification'

function DigitalAssetsManageEmpty() {
  return (
    <OverlayNotification
      color='gray'
      image='screen-search'
      description={t`There are no Digital Assets to show`}
      isTransparent
    />
  )
}

export default DigitalAssetsManageEmpty
