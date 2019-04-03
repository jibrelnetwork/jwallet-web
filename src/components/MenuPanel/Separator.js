// @flow

import React from 'react'
import classNames from 'classnames'

import menuPanelStyle from './menuPanel.m.scss'

export function Separator() {
  return <div className={classNames('__menu-panel_separator', menuPanelStyle.separator)} />
}
