// @flow

import React from 'react'
import classNames from 'classnames'

const JText = ({ value, size, color, weight, fontCase, whiteSpace, align }: Props) => (
  <div
    className={classNames(
      `j-text -${size} -${color} -${whiteSpace}`,
      align && `-${align}`,
      weight && `-${weight}`,
      fontCase && `-${fontCase}`,
    )}
  >
    {i18n(value) || value}
  </div>
)

type Props = {
  value: string,
  align: null | 'center',
  fontCase: null | 'upper',
  whiteSpace: 'nowrap' | 'wrap',
  weight: null | 'bold' | 'bolder',
  color: 'blue' | 'gray' | 'red' | 'sky' | 'white',
  size: 'small' | 'normal' | 'large' | 'header' | 'title' | 'mnemonic',
}

JText.defaultProps = {
  align: null,
  weight: null,
  size: 'normal',
  color: 'white',
  fontCase: null,
  whiteSpace: 'nowrap',
}

export default JText
