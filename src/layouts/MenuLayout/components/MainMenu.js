// @flow

import React from 'react'
import classnames from 'classnames'

import {
  JLink,
  JLinkBack,
} from 'components/base'

import menuLayoutStyle from '../menuLayout.m.scss'

export type MenuMode = null | 'minimized'

type Props = {|
  mode?: MenuMode,
  previousRouteNameFallback?: string,
|}

export function MainMenu({
  mode,
  previousRouteNameFallback,
}: Props) {
  return (
    <header
      className={classnames(
        '__mainmenu',
        menuLayoutStyle.menu,
        menuLayoutStyle[mode],
      )}
    >
      {previousRouteNameFallback && (
        <JLinkBack
          routeName={previousRouteNameFallback}
        >
          ←
        </JLinkBack>
      )}
      <JLink href='/'>Home</JLink>
      <JLink href='/send'>Send</JLink>
      <JLink href='/404'>404</JLink>
    </header>
  )
}

MainMenu.defaultProps = {
  mode: null,
  previousRouteNameFallback: null,
}
