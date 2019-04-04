// @flow

import React from 'react'
import classNames from 'classnames'
import { t } from 'ttag'

import {
  JIcon,
  JLink,
} from 'components/base'

import menuPanelStyle from './menuPanel.m.scss'

export function Settings() {
  return (
    <div
      className={classNames(
        '__menu-panel_actions',
        menuPanelStyle.actions,
        menuPanelStyle.settings,
      )}
    >
      <JLink
        href='/settings'
        activeClassName={menuPanelStyle.active}
        className={classNames('__menu-panel_action', menuPanelStyle.action)}
      >
        <JIcon name='settings-use-fill' />
        <span className={classNames('__menu-panel_label', menuPanelStyle.label)}>
          {t`Settings`}
        </span>
      </JLink>
    </div>
  )
}
