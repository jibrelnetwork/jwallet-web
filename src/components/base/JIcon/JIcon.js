// @flow

import React from 'react'
import classNames from 'classnames'

const JIcon = ({ name, size, color }: Props) => (
  <div className={classNames(`j-icon -${name} -${size}`, color && `-${color}`)} />
)

type Props = {
  name: string,
  size: 'small' | 'medium' | 'large',
  color: 'white' | 'blue' | 'gray' | null,
}

JIcon.defaultProps = {
  name: 'arrow',
  size: 'small',
  color: null,
}

export default JIcon
