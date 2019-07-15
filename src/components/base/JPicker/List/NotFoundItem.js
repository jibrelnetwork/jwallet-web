// @flow strict

import React from 'react'
import { useI18n } from 'app/hooks'

import notFoundItemStyles from './notFoundItem.m.scss'

export function NotFoundItem() {
  const i18n = useI18n()

  return (
    <div className={notFoundItemStyles.core}>
      {i18n._(
        'common.JPicker.List.NotFoundItem.description',
        null,
        { defaults: 'Not Found' },
      )}
    </div>
  )
}
