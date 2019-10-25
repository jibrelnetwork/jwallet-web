// @flow strict

import React from 'react'
import classNames from 'classnames'

import {
  JLink,
  AppLogo,
} from 'components/base'

import menuPanelStyle from './menuPanel.m.scss'

import { Back } from './components/Back'
import { Wallet } from './components/Wallet'
import { Actions } from './components/Actions'
import { Network } from './components/Network'

import {
  getMenuMeta,
  type MenuMeta,
} from './menuMeta'

type Props = {|
  +routeName: string,
|}

export function MenuPanel({ routeName }: Props) {
  const {
    isMinimized,
    previousRoute,
  }: MenuMeta = getMenuMeta(routeName)

  return (
    <header
      className={classNames(
        '__menu-panel',
        menuPanelStyle.core,
        isMinimized && menuPanelStyle.minimized,
      )}
    >
      <Network />
      <JLink
        href='/'
        className={classNames(
          '__logo',
          menuPanelStyle.logo,
        )}
      >
        <AppLogo />
      </JLink>
      <Wallet />
      <Actions routeName={routeName} />
      <Back
        previousRoute={previousRoute}
        isMinimized={isMinimized}
      />
    </header>
  )
}
