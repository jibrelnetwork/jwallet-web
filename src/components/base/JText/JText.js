// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

type Props = {
  size: 'small' | 'normal' | 'large' | 'header' | 'title' | 'mnemonic',
  color: 'blue' | 'gray' | 'red' | 'sky' | 'white' | 'dark',
  value: string,
  align: null | 'center',
  weight: null | 'bold' | 'bolder',
  fontCase: null | 'upper',
  whiteSpace: 'nowrap' | 'wrap',
}

class JText extends PureComponent<Props, *> {
  static defaultProps = {
    size: 'normal',
    align: null,
    color: 'white',
    weight: null,
    fontCase: null,
    whiteSpace: 'nowrap',
  }

  render() {
    const {
      size,
      align,
      value,
      color,
      weight,
      fontCase,
      whiteSpace,
    } = this.props
    return (
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
  }
}

export default JText
