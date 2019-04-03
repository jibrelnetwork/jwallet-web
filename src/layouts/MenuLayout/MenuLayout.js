// @flow

import React from 'react'
import classnames from 'classnames'

import menuLayoutStyle from './menuLayout.m.scss'
import {
  MainMenu,
} from './components/MainMenu'
import { getMenuConfig } from './menuConfig'

type Props = {|
  +routeName: string,
  +children: React$Node,
|}

export function MenuLayout({
  routeName,
  children,
}: Props) {
  const {
    menu: mode,
    previousRouteNameFallback,
  } = getMenuConfig(routeName)

  return (
    <div
      className={classnames(
        `__page-${routeName.toLowerCase()}`,
        menuLayoutStyle.core,
        menuLayoutStyle[mode],
      )}
    >
      <MainMenu
        mode={mode}
        previousRouteNameFallback={previousRouteNameFallback}
      />
      <div className={menuLayoutStyle.content}>
        {children}
      </div>
    </div>
  )
}
