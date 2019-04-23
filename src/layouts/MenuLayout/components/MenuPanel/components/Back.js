// @flow strict

import React from 'react'

import {
  JIcon,
  JLinkBack,
} from 'components/base'

import menuPanelStyle from '../menuPanel.m.scss'

type Props = {|
  +previousRouteNameFallback: ?string,
  +isMinimized: boolean,
|}

export function Back({
  previousRouteNameFallback,
  isMinimized,
}: Props) {
  if (!isMinimized || !previousRouteNameFallback) {
    return null
  }

  return (
    <JLinkBack
      className={`__back ${menuPanelStyle.back}`}
      routeName={previousRouteNameFallback}
    >
      <JIcon
        name='arrow-back-use-fill'
        color='blue'
      />
    </JLinkBack>
  )
}
