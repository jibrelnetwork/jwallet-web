// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

type JTextAlign = 'center'
type JTextFontCase = 'upper'
type JTextDecoration = 'underline'
type JTextWeight = 'bold' | 'bolder'
type JTextWhiteSpace = 'nowrap' | 'wrap'
type JTextSize = 'small' | 'normal' | 'large' | 'header' | 'tab' | 'title'
type JTextColor = 'blue' | 'gray' | 'red' | 'sky' | 'white' | 'dark' | 'dusk'

type Props = {|
  +value: string,
  +size: ?JTextSize,
  +color: ?JTextColor,
  +align: ?JTextAlign,
  +weight: ?JTextWeight,
  +fontCase: ?JTextFontCase,
  +decoration: ?JTextDecoration,
  +whiteSpace: ?JTextWhiteSpace,
|}

class JText extends PureComponent<Props, *> {
  static defaultProps = {
    align: null,
    weight: null,
    fontCase: null,
    decoration: null,
    size: 'normal',
    color: 'white',
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
      decoration,
      whiteSpace,
    } = this.props

    return (
      <div
        className={classNames(
          'j-text',
          size && `-${size}`,
          color && `-${color}`,
          align && `-${align}`,
          weight && `-${weight}`,
          fontCase && `-${fontCase}`,
          decoration && `-${decoration}`,
          whiteSpace && `-${whiteSpace}`,
        )}
      >
        {value}
      </div>
    )
  }
}

export default JText
