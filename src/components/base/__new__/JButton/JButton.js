/* @flow */

import React from 'react'
import { pure } from 'recompose'
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
 iconSize?: 'small' | 'medium',
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
  iconSize,
  disabled,
  isLoading,
}: Props) => (
  <div
    onClick={disabled || onClick}
    className={
      classnames(
        'JButton', {
          '-loading': isLoading,
          '-with-text': text,
        }, prop(color, {
          blue: '-blue',
          white: '-white',
        }),
        large ? '-large' : '-regular',
        minimal && '-minimal'
      )
    }
  >
    {iconName && (
      <div className='icon'>
        <JIcon name={iconName} size={iconSize} />
      </div>
    )}
    {text && (
      <div className='text'>
        <JText
          value={text}
          variants={[
            minimal
              ? { white: 'white', blue: 'blue' }[color]
              : { white: 'blue', blue: 'white' }[color],
            'bold',
            'normal',
          ]}
        />
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
  iconSize: 'small',
  isLoading: false,
}

export default pure(JButton)
