// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import { iconsUI } from 'utils/sprite'

export type JIconColor = 'white' | 'blue' | 'gray' | 'sky' | 'red' | 'black'

export type Props = {
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

    if (iconData) {
      return (
        <svg
          className={classNames(
            'j-icon',
            color && `-${color}`,
            hasFill && '-use-fill',
          )}
          width={iconData.width}
          height={iconData.height}
        >
          <use xlinkHref={iconData.url} />
        </svg>
      )
    } else {
      return (
        <div className='j-icon -no-icon' />
      )
    }
  }
}

export default JIcon
