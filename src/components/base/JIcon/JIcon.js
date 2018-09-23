// @flow

import React from 'react'

const JIcon = ({ name, size, color }: Props) => (
  <div className={`j-icon -${name} -${size} -${color}`} />
)

// @TODO: need to enumerate all icons
// @TODO: in JFlatButton colors are: 'blue' | 'gray' | 'sky' | 'white'
type Props = {
  name: string,
  color: 'white' | 'blue' | 'gray' | 'sky',
  size: 'small' | 'medium' | 'large',
}

export default JIcon
