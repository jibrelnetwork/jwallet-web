// @flow strict

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import { iconsUI } from 'utils/sprite'

import styles from './jIcon.m.scss'

export type JIconColor = 'white' | 'blue' | 'gray' | 'sky' | 'red' | 'black'

export type JIconProps = {|
  +name: string,
  +color: ?JIconColor,
  +className?: ?string,
|}

export default class JIcon extends PureComponent<JIconProps> {
  static defaultProps = {
    color: null,
    className: null,
  }

  render() {
    const {
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
            styles.core,
            styles.empty,
            className,
          )}
        />
      )
    }

    return (
      <svg
        className={classNames(
          '__icon',
          styles.core,
          color && styles[color],
          iconData.colored && styles.colored,
          hasFill && styles.fill,
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
