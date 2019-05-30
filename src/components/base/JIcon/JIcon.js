// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import { iconsUI } from 'utils/sprite'

import jIconStyle from './jIcon.m.scss'

type JIconHandler = () => void
export type JIconColor = 'white' | 'blue' | 'gray' | 'sky' | 'red' | 'black'

export type JIconProps = {
  onClick: ?JIconHandler,
  name: string,
  color: ?JIconColor,
  className?: ?string,
}

export class JIcon extends PureComponent<JIconProps> {
  static defaultProps = {
    onClick: null,
    color: null,
    className: null,
  }

  render() {
    const {
      onClick,
      name,
      color,
      className,
    }: JIconProps = this.props

    const iconData = iconsUI[`${name}-usage`]
    const hasFill = name.indexOf('use-fill') !== -1

    if (!iconData) {
      return (
        <div
          className={classNames(
            '__icon',
            jIconStyle.core,
            jIconStyle.empty,
            className,
          )}
        />
      )
    }

    return (
      <svg
        onClick={onClick}
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
        <use
          key={name}
          xlinkHref={iconData.url}
        />
      </svg>
    )
  }
}
