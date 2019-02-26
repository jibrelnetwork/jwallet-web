// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

export type JIconColor = 'white' | 'blue' | 'gray' | 'sky' | 'red' | 'black'

type Props = {
  name: string,
  color: ?JIconColor,
}

const files = require.context('../../../public/assets/icons/sprite-pack', true, /.*\.svg$/)
const icons = files.keys().map(
  x => files(x).default).reduce((result, { id, url, viewBox }
) => ({ ...result, [id]: { url, viewBox } }), {})

class JIcon extends PureComponent<Props> {
  static defaultProps = {
    color: null,
  }

  render() {
    const { name, color }: Props = this.props

    const iconData = icons[`${name}-usage`]
    const viewBox = iconData ? iconData.viewBox : ''
    const sizeArray = viewBox.split(/(\s+)/).filter(e => e.trim().length > 0)
    const width = sizeArray[2]
    const height = sizeArray[3]

    return (
      <svg
        className={classNames('j-icon', color && `-${color}`)}
        width={width} height={height}
      >
        <use xlinkHref={iconData && iconData.url} />
      </svg>
    )
  }
}

export default JIcon
