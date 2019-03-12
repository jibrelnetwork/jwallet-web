// @flow

import React from 'react'
import classNames from 'classnames'
import { iconsUI } from 'utils/sprite'

export type JIconColor = 'white' | 'blue' | 'gray' | 'sky' | 'red' | 'black'

type Props = {
  name: string,
  color: ?JIconColor,
}

function JIcon({
  name, color,
}: Props) {
  const iconData = iconsUI[`${name}-usage`]
  const hasFill = name.indexOf('use-fill') !== -1

  return (
    <svg
      className={classNames(
        'j-icon',
        color && `-${color}`,
        hasFill && '-use-fill')}
      width={iconData.width}
      height={iconData.height}
    >
      <use xlinkHref={iconData.url} />
    </svg>
  )
}

JIcon.defaultProps = {
  color: null,
}

export default JIcon
