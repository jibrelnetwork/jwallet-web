// @flow

import classNames from 'classnames'
import React from 'react'
import { t } from 'ttag'

import {
  JIcon,
  JLink,
} from 'components/base'

import menuPanelStyle from './menuPanel.m.scss'

export function Settings() {
  return (
    <div className={classNames(menuPanelStyle.actions, menuPanelStyle.settings)}>
      <JLink
        href='/settings'
        className={menuPanelStyle.action}
        activeClassName={menuPanelStyle.active}
      >
        <JIcon name='settings' size='medium' />
        <span className={menuPanelStyle.label}>
          {t`Settings`}
        </span>
      </JLink>
    </div>
  )
}
