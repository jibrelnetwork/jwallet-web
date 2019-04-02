// @flow

import React from 'react'
import { t } from 'ttag'

import {
  JIcon,
  JLink,
} from 'components/base'

import menuPanelStyle from './menuPanel.m.scss'

export function Actions() {
  return (
    <div className={menuPanelStyle.actions}>
      <JLink
        href='/'
        className={menuPanelStyle.action}
        activeClassName={menuPanelStyle.active}
      >
        <JIcon name='home' size='medium' />
        <span className={menuPanelStyle.label}>
          {t`Home`}
        </span>
      </JLink>
      <JLink
        href='/history'
        className={menuPanelStyle.action}
        activeClassName={menuPanelStyle.active}
      >
        <JIcon name='history' size='medium' />
        <span className={menuPanelStyle.label}>
          {t`History`}
        </span>
      </JLink>
      <JLink
        href='/contacts'
        className={menuPanelStyle.action}
        activeClassName={menuPanelStyle.active}
      >
        <JIcon name='contact' size='medium' />
        <span className={menuPanelStyle.label}>
          {t`Contacts`}
        </span>
      </JLink>
      <JLink
        href='/more'
        className={menuPanelStyle.action}
        activeClassName={menuPanelStyle.active}
      >
        <JIcon name='more' size='medium' />
        <span className={menuPanelStyle.label}>
          {t`More`}
        </span>
      </JLink>
    </div>
  )
}
