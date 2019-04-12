// @flow strict

import React from 'react'

import {
  JIcon,
  JLinkBack,
} from 'components/base'

import menuLayoutStyle from '../../menuLayout.m.scss'

type Props = {|
  +previousRouteNameFallback: ?string,
  +isHidden: boolean,
|}

export function Back({
  previousRouteNameFallback,
  isHidden,
}: Props) {
  return (
    <div className={`__back ${menuLayoutStyle.back}`}>
      {isHidden && previousRouteNameFallback && (
        <JLinkBack routeName={previousRouteNameFallback}>
          <JIcon name='arrow-back' size='medium' color='blue' />
        </JLinkBack>
      )}
    </div>
  )
}
