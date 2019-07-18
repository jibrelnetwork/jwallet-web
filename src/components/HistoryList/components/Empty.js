// @flow strict

import React from 'react'
import { useI18n } from 'app/hooks'

import OverlayNotification from 'components/OverlayNotification'

type Props = {|
  +isFiltered: boolean,
|}

export function Empty({ isFiltered }: Props) {
  const i18n = useI18n()

  return (
    <OverlayNotification
      description={isFiltered
        ? [i18n._('TransactionsList.Empty.filtered')]
        : [i18n._('TransactionsList.Empty.default')]}
      color='gray'
      image='screen-reload'
      isTransparent
    />
  )
}
