// @flow

import React from 'react'
import classNames from 'classnames'
import { iconsUI } from 'utils/sprite'

import jIconStyle from './jIcon.m.scss'

export type JIconColor = 'white' | 'blue' | 'gray' | 'sky' | 'red' | 'black'

type Props = {
  name: string,
  color: ?JIconColor,
  className?: ?string,
}

export function JIcon({
  name,
  color,
  className,
}: Props) {
  const iconData = iconsUI[`${name}-usage`]
  const hasFill = name.indexOf('use-fill') !== -1

  if (iconData) {
    return (
      <svg
        className={classNames(
          '__icon',
          jIconStyle.core,
          color && jIconStyle[color],
          hasFill && jIconStyle.fill,
          className,
        )}
        width={iconData.width}
        height={iconData.height}
      >
        <use xlinkHref={iconData.url} />
      </svg>
    )
  } else {
    return (
      <div
        className={classNames(
          '__icon',
          jIconStyle.core,
          jIconStyle.noIcon,
          className,
        )}
      />
    )
  }
}

JIcon.defaultProps = {
  color: null,
}
