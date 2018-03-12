/* @flow */

import React from 'react'
import classnames from 'classnames'
import { empty, prop } from 'ramda'

import JText from '../JText'
import JIcon from '../JIcon'
import './JButton.scss'

type Props = {
 text?: string,
 color: 'white' | 'blue',
 large?: boolean,
 minimal?: boolean,
 onClick?: Function,
 iconName?: string,
 disabled?: boolean,
 isLoading?: boolean,
}

const JButton = ({
  text,
  color,
  large,
  onClick,
  minimal,
  iconName,
  disabled,
  isLoading,
}: Props) => (
  <div
    onClick={disabled || onClick}
    className={classnames('JButton', {
      '-loading': isLoading,
    }, prop(color, {
      blue: '-blue',
      white: '-white',
    }), large ? '-large' : '-regular', minimal && '-minimal')}
  >
    {iconName && (
      <div className='icon'>
        <JIcon name={iconName} size='small' />
      </div>
    )}
    {text && (
      <div className='text'>
        <JText value={text} />
      </div>
    )}
  </div>
)

JButton.defaultProps = {
  text: undefined,
  large: false,
  onClick: empty,
  minimal: false,
  iconName: undefined,
  disabled: false,
  isLoading: false,
  withBorder: false,
}

export default JButton
