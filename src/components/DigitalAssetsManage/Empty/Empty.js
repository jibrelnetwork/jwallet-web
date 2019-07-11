// @flow

import React from 'react'
import { useI18n } from 'app/hooks'

import OverlayNotification from 'components/OverlayNotification'

function DigitalAssetsManageEmpty() {
  const i18n = useI18n()

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
