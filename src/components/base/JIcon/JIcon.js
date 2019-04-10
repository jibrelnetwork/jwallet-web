// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import { iconsUI } from 'utils/sprite'

import jIconStyle from './jIcon.m.scss'

export type JIconColor = 'white' | 'blue' | 'gray' | 'sky' | 'red' | 'black'

type Props = {
  name: string,
  color: ?JIconColor,
  className?: ?string,
}

export class JIcon extends PureComponent<Props> {
  static defaultProps = {
    color: 'white',
  }

  render() {
    const {
      name,
      color,
      className,
    }: Props = this.props

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
}
