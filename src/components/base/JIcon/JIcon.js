// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import { iconsUI } from 'utils/sprite'

import jIconStyle from './jIcon.m.scss'

export type JIconColor = 'white' | 'blue' | 'gray' | 'sky' | 'red' | 'black'

type Props = {
  name: string,
  color: JIconColor,
}

class JIcon extends PureComponent<Props> {
  static defaultProps = {
    color: 'white',
  }

  render() {
    const {
      name,
      color,
    }: Props = this.props

    const iconData = iconsUI[`${name}-usage`]
    const hasFill = name.indexOf('use-fill') !== -1

    if (!iconData) {
      return (
        <div
          className={classNames(
            '__j-icon',
            jIconStyle.core,
            hasFill && jIconStyle.empty,
          )}
        />
      )
    }

    return (
      <svg
        className={classNames(
          '__j-icon',
          jIconStyle.core,
          color && jIconStyle[color],
          hasFill && jIconStyle.fill,
        )}
        width={iconData.width}
        height={iconData.height}
      >
        <use xlinkHref={iconData.url} />
      </svg>
    )
  }
}

export default JIcon
