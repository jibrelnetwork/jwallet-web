// @flow strict

import React from 'react'
import { t } from 'ttag'

import menuPanelStyle from '../menuPanel.m.scss'
import { Action } from './Action'

export function Settings() {
  return (
    <div className={`__settings ${menuPanelStyle.actions} ${menuPanelStyle.settings}`}>
      <Action
        label={t`Settings`}
        href='/settings'
        iconName='settings'
      />
    </div>
  )
}
