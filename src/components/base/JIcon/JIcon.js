// @flow

import React, { PureComponent } from 'react'

export type JIconSize = 'small' | 'medium' | 'large' | 'xlarge'
export type JIconColor = 'white' | 'blue' | 'gray' | 'sky' | 'red' | 'black'

type Props = {
  name: string,
  size: JIconSize,
  color: JIconColor,
}

const files = require.context('../../../public/assets/icons/new-pack', true, /.*\.svg$/)
files.keys().forEach(x => files(x))

class JIcon extends PureComponent<Props> {
  static defaultProps = {
    size: 'medium',
    color: 'white',
  }

  render() {
    const { name, size, color }: Props = this.props

    return (
      <svg className={`j-icon -${size} -${color}`} >
        <use xlinkHref={`#${name}-${color}`} />
      </svg>
    )
  }
}

export default JIcon
