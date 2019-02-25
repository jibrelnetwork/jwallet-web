// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

export type JIconSize = 'small' | 'medium' | 'large' | 'xlarge'
export type JIconColor = 'white' | 'blue' | 'gray' | 'sky' | 'red' | 'black'

type Props = {
  name: string,
  size: JIconSize,
  color: ?JIconColor,
}

const files = require.context('../../../public/assets/icons/sprite-pack', true, /.*\.svg$/)
const icons = files.keys().map(x => files(x).default).reduce((result, { id, url }) => ({
  ...result,
  [id]: url,
}), {})

class JIcon extends PureComponent<Props> {
  static defaultProps = {
    size: 'medium',
    color: null,
    useСurrentСolor: false,
  }

  render() {
    const { name, size, color }: Props = this.props

    const url = icons[`${name}-usage`]
    return (
      <svg className={classNames(`j-icon -${size}`, color && `-${color}`)} >
        <use xlinkHref={url || name} />
      </svg>
    )
  }
}

export default JIcon
