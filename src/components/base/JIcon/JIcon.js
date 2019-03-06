// @flow

import React from 'react'
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

function JIcon({
  name, color,
}: Props) {
  const iconData = icons[`${name}-usage`]
  const isUseFill = name.indexOf('use-fill') !== -1

  return (
    <svg
      className={classNames(
        'j-icon',
        color && `-${color}`,
        isUseFill && '-use-fill')}
      width={iconData.width}
      height={iconData.height}
    >
      <use xlinkHref={iconData.url} />
    </svg>
  )
}

JIcon.defaultProps = {
  color: null,
}

export default JIcon
