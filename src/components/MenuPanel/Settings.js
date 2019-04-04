// @flow

import React from 'react'
import { t } from 'ttag'

import {
  JIcon,
  JLink,
} from 'components/base'

import menuPanelStyle from './menuPanel.m.scss'

export function Settings() {
  return (
    <div className={`__settings ${menuPanelStyle.actions} ${menuPanelStyle.settings}`}>
      <JLink
        href='/settings'
        className={menuPanelStyle.action}
        activeClassName={menuPanelStyle.active}
      >
        <JIcon name='settings-use-fill' />
        <span className={menuPanelStyle.label}>
          {t`Settings`}
        </span>
      </JLink>
    </div>
  )
}
