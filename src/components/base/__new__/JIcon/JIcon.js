/* @flow */

import React from 'react'
import { pure } from 'recompose'
import cx from 'classnames'
import { prop } from 'ramda'

import './JIcon.scss'

type Props = {
  name: string,
  size: 'small' | 'medium' | 'large' | 'extra-large' | 'huge',
}

const JIcon = ({ name, size }: Props) => (
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
  )}
  />
)

export default pure(JIcon)
