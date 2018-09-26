// @flow

import React, { PureComponent } from 'react'

type Props = {
  // @TODO: need to enumerate all icons
  name: string,
  // @TODO: in JFlatButton colors are: 'blue' | 'gray' | 'sky' | 'white'
  color: 'white' | 'blue' | 'gray',
  size: 'small' | 'medium' | 'large' | 'xlarge',
}

class JIcon extends PureComponent<Props, *> {
  static defaultProps = {
    size: 'medium',
    color: 'white',
  }

  render() {
    const { name, size, color } = this.props
    return (
      <div className={`j-icon -${name} -${size} -${color}`} />
    )
  }
}

export default JIcon
