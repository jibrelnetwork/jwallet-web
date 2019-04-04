// @flow

import React from 'react'

import {
  JIcon,
  JLinkBack,
} from 'components/base'

import menuPanelStyle from './menuPanel.m.scss'

type Props = {|
  +previousRouteNameFallback: ?string,
  +isMinimized: boolean,
|}

export function Back({
  previousRouteNameFallback,
  isMinimized,
}: Props) {
  return (
    <div className={`__back ${menuPanelStyle.back}`}>
      {isMinimized && previousRouteNameFallback && (
        <JLinkBack routeName={previousRouteNameFallback}>
          <JIcon name='arrow-back' size='medium' color='blue' />
        </JLinkBack>
      )}
    </div>
  )
}
