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
const icons = files.keys().map(x => files(x).default).reduce((result, { id, url }) => ({
  ...result,
  [id]: url,
}), {})

class JIcon extends PureComponent<Props> {
  static defaultProps = {
    size: 'medium',
    color: 'white',
  }

  render() {
    const { name, size, color }: Props = this.props

    const url = icons[`${name}-usage`] || icons[`${name}-${color}-usage`]

    return (
      <svg className={`j-icon -${size} -${color}`} >
        <use xlinkHref={`${url}`} />
      </svg>
    )
  }
}

export default JIcon
