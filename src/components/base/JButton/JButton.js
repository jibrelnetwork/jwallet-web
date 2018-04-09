// @flow

import React from 'react'
import classNames from 'classnames'
import { empty, prop } from 'ramda'

import { JIcon, JText } from 'components/base'

const JButton = ({
  onClick,
  text,
  iconName,
  color,
  iconSize,
  large,
  right,
  minimal,
  disabled,
  isLoading,
  transparent,
}: Props) => (
  <div
    onClick={disabled || onClick}
    className={classNames(
      'j-button', {
        '-loading': isLoading,
        '-with-text': text,
      }, color ? prop(color, {
        blue: '-blue',
        white: '-white',
      }) : null,
      large ? '-large' : '-regular',
      right && '-right',
      minimal && '-minimal',
      transparent && '-transparent',
    )}
  >
    {iconName && (
      <div className='icon'>
        <JIcon name={iconName} size={iconSize} color={color} />
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

type Props = {
 onClick: Function,
 text: string,
 iconName: string,
 color: 'white' | 'blue',
 iconSize: 'small' | 'medium',
 large: boolean,
 right: boolean,
 minimal: boolean,
 disabled: boolean,
 isLoading: boolean,
 transparent: boolean,
}

JButton.defaultProps = {
  onClick: empty,
  iconSize: 'small',
  large: false,
  right: false,
  minimal: false,
  disabled: false,
  isLoading: false,
  transparent: false,
  text: undefined,
  color: undefined,
  iconName: undefined,
}

export default JButton
