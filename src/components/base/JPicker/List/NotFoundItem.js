// @flow strict

import React from 'react'
import { t } from 'ttag'

import notFoundItemStyles from './notFoundItem.m.scss'

function NotFoundItem() {
  return (
    <div className={notFoundItemStyles.core}>
      {t`Not Found`}
    </div>
  )
}

export { NotFoundItem }
