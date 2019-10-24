// @flow strict

import React from 'react'

import {
  JIcon,
  JLink,
} from 'components/base'

import menuPanelStyle from '../menuPanel.m.scss'

type Props = {|
  +previousRoute: ?string,
  +isMinimized: boolean,
|}

export function Back({
  previousRoute,
  isMinimized,
}: Props) {
  if (!isMinimized || !previousRoute) {
    return null
  }

  return (
    <JLink
      href={previousRoute}
      className={`__back ${menuPanelStyle.back}`}
    >
      <JIcon name='arrow-back-use-fill' />
    </JLink>
  )
}
