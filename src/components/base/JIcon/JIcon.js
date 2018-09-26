// @flow

import React from 'react'

const JIcon = ({ name, size, color }: Props) => (
  <div className={`j-icon -${name} -${size} -${color}`} />
)

// @TODO: need to enumerate all icons
// @TODO: in JFlatButton colors are: 'blue' | 'gray' | 'sky' | 'white'
type Props = {
  name: string,
  color: 'white' | 'blue' | 'gray',
  size: 'small' | 'medium' | 'large' | 'xlarge',
}

JIcon.defaultProps = {
  color: 'white',
  size: 'medium',
}

export default JIcon
