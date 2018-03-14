// @flow

import React from 'react'
import classNames from 'classnames'
import { prop } from 'ramda'

const JIcon = ({ name, size, transparent }: Props) => (
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
    transparent && '-transparent',
  )}
  />
)

type Props = {
  name: string,
  size: 'small' | 'medium' | 'large' | 'extra-large' | 'huge',
  transparent?: boolean,
}

JIcon.defaultProps = {
  transparent: false,
}

export default JIcon
