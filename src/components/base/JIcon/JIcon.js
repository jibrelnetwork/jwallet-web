// @flow

import React from 'react'

const JIcon = ({ name, size, color }: Props) => (
  <div className={`j-icon -${name} -${size} -${color}`} />
)

type Props = {
  name: string,
  color: 'white' | 'blue' | 'gray',
  size: 'small' | 'medium' | 'large',
}

export default JIcon
