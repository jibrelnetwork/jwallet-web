// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { keyBy } from 'lodash-es'

export type JIconColor = 'white' | 'blue' | 'gray' | 'sky' | 'red' | 'black'

type Props = {
  name: string,
  color: ?JIconColor,
}

const files = require.context('../../../public/assets/icons/sprite-pack', true, /.*\.svg$/)
const icons = keyBy(
  files.keys().map((x) => {
    const filesArray = files(x).default
    const sizeArray = filesArray.viewBox.split(/(\s+)/).filter(e => e.trim().length > 0)
    /* eslint-disable prefer-destructuring, fp/no-mutation */
    filesArray.width = sizeArray[2]
    filesArray.height = sizeArray[3]

    /* eslint-enable prefer-destructuring, fp/no-mutation */
    return filesArray
  }),
  'id',
)

type StateProps = {
  useFill: boolean,
}

class JIcon extends PureComponent<Props, StateProps> {
  static defaultProps = {
    color: null,
  }
  constructor(props: Props) {
    super(props)

    this.state = {
      useFill: false,
    }
  }

  onUseFill = () => this.setState({ useFill: true })

  render() {
    const {
      name,
      color,
    }: Props = this.props

    const {
      useFill,
    } = this.state

    const iconData = icons[`${name}-usage`]

    if (name.indexOf('use-fill') !== -1) {
      this.onUseFill()
    }

    return (
      <svg
        className={classNames('j-icon', color && `-${color}`, useFill && '-use-fill')}
        width={iconData.width} height={iconData.height}
      >
        <use xlinkHref={iconData.url} />
      </svg>
    )
  }
}

export default JIcon
