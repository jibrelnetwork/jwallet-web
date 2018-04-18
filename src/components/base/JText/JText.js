// @flow

import React from 'react'
import classNames from 'classnames'

const JText = ({ value, size, color, weight, fontCase, whiteSpace, align }: Props) => (
  <div
    className={classNames(
      `j-text -${size} -${color}`,
      align && `-${align}`,
      weight && `-${weight}`,
      fontCase && `-${fontCase}`,
      whiteSpace && `-${whiteSpace}`,
    )}
  >
    {i18n(value) || value}
  </div>
)

type Props = {
  value: string,
  align: 'center' | null,
  fontCase: 'upper' | null,
  whiteSpace: 'nowrap' | 'wrap',
  weight: 'bold' | 'bolder' | null,
  color: 'blue' | 'gray' | 'red' | 'white',
  size: 'small' | 'normal' | 'large' | 'header' | 'title',
}

JText.defaultProps = {
  value: '',
  align: null,
  weight: null,
  size: 'normal',
  color: 'white',
  fontCase: null,
  whiteSpace: 'nowrap',
}

export default JText
