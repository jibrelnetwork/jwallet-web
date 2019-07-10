// @flow strict

import React from 'react'
import { i18n } from 'i18n/lingui'

import notFoundItemStyles from './notFoundItem.m.scss'

function NotFoundItem() {
  return (
    <div className={notFoundItemStyles.core}>
      {i18n._(
        'JPicker.notFound',
        null,
        { defaults: 'Not Found' },
      )}
    </div>
  )
}

export { NotFoundItem }
