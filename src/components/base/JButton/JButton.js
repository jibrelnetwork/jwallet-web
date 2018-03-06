/* @flow */
import React from 'react'
import classnames from 'classnames'
import { empty, prop } from 'ramda'

import './JButton.scss'
import JText from '../JText'
import JIcon from '../JIcon'

type Props = {
 text?: string,
 size: 'big' | 'small',
 color: 'white' | 'blue',
 onClick?: Function,
 iconName?: string,
 disabled?: boolean,
 isLoading?: boolean,
 withBorder?: boolean,
}

const JButton = ({
  text,
  size,
  color,
  onClick,
  iconName,
  disabled,
  isLoading,
  withBorder,
}: Props) => (
  <div
    onClick={disabled || onClick}
    className={classnames('JButton', {
      '-loading': isLoading,
      '-bordered': withBorder,
    }, prop(color, {
      blue: '-blue',
      white: '-white',
    }), prop(size, {
      big: '-big',
      small: '-small',
    }))}
  >
    {iconName && (
      <div className='icon'>
        <JIcon name={iconName} small />
      </div>
    )}
    {text && (
      <div className='icon'>
        <JText value={text} />
      </div>
    )}
  </div>
)

JButton.defaultProps = {
  text: undefined,
  onClick: empty,
  iconName: undefined,
  disabled: false,
  isLoading: false,
  withBorder: false,
}

export default JButton
