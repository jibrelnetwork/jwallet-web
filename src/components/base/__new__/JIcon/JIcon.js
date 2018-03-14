/* @flow */

import React from 'react'
import { pure } from 'recompose'
import cx from 'classnames'
import { prop } from 'ramda'

import './JIcon.scss'

type Props = {
  name: string,
  size: 'small' | 'medium' | 'large' | 'extra-large' | 'huge',
  transparent?: boolean, 
}

const JIcon = ({ name, size, transparent }: Props) => (
  <div className={cx(
    'JIcon',
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

JIcon.defaultProps = {
  transparent: false,
}

export default pure(JIcon)
