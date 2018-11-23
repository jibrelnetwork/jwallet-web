// @flow

import React, { PureComponent } from 'react'

type Props = {
  name: string,
  color: 'white' | 'blue' | 'gray' | 'sky' | 'red',
  size: 'small' | 'medium' | 'large' | 'xlarge',
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
