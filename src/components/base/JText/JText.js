// @flow

import React from 'react'
import classNames from 'classnames'

const JText = ({ value, size, color, weight, fontCase }: Props) => (
  <div
    className={classNames(
      `j-text -${size} -${color}`, weight && `-${weight}`, fontCase && `-${fontCase}`,
    )}
  >
    {i18n(value) || value}
  </div>
)

type Props = {
  value: string,
  size: 'small' | 'normal' | 'large' | 'header' | 'title',
  color: 'blue' | 'gray' | 'red' | 'white',
  weight: 'bold' | 'bolder' | null,
  fontCase: 'upper' | null,
}

JText.defaultProps = {
  value: '',
  size: 'normal',
  color: 'white',
  weight: null,
  fontCase: null,
}

export default JText
