// @flow

import React from 'react'
import { i18n } from 'i18n/lingui'

import OverlayNotification from 'components/OverlayNotification'

function DigitalAssetsManageEmpty() {
  return (
    <OverlayNotification
      color='gray'
      image='screen-search'
      description={i18n._(
        'DigitalAssetsManage.Empty.description',
        null,
        { defaults: 'There are no Digital Assets to show' },
      )}
      isTransparent
    />
  )
}

export default DigitalAssetsManageEmpty
