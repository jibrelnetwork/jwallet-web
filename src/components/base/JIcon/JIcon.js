// @flow

import React, { PureComponent } from 'react'

export type JIconSize = 'small' | 'medium' | 'large' | 'xlarge'
export type JIconColor = 'white' | 'blue' | 'gray' | 'sky' | 'red' | 'black'

type Props = {
  name: string,
  size: JIconSize,
  color: JIconColor,
}

class JIcon extends PureComponent<Props> {
  static defaultProps = {
    size: 'medium',
    color: 'white',
  }

  render() {
    const { name, size, color }: Props = this.props

    return (
      <div className={`j-icon -${name} -${size} -${color}`} />
    )
  }
}

export default JIcon
