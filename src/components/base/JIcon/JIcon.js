// @flow

import React from 'react'

const JIcon = ({ name, size, color }: Props) => (
  <div className={`j-icon -${name} -${size} -${color}`} />
)

type Props = {
  name: string,
  color: 'white' | 'blue' | 'gray',
  size: 'small' | 'medium' | 'large' | '14' | '16' | '20' | '24' | '48' | '90',
}

export default JIcon
