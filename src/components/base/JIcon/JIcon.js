// @flow

import React from 'react'
import classNames from 'classnames'
import { prop } from 'ramda'

const JIcon = ({ name, size, color, transparent }: Props) => (
  <div className={classNames(
    'j-icon',
    prop(size, {
      huge: '-huge',
      large: '-large',
      small: '-small',
      medium: '-medium',
      'extra-large': '-extra-large',
    }),
    `-${name}`,
    color && `-${color}`,
    transparent && '-transparent',
  )}
  />
)

type Props = {
  name: string,
  size: 'small' | 'medium' | 'large' | 'extra-large',
  color?: string,
  transparent?: boolean,
}

JIcon.defaultProps = {
  color: undefined,
  transparent: false,
}

export default JIcon
