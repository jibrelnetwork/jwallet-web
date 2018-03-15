// @flow

import React from 'react'
import classNames from 'classnames'
import { empty, prop } from 'ramda'

import { JIcon, JText } from 'components/base/__new__'

const JButton = ({
  text,
  color,
  large,
  minimal,
  onClick,
  iconName,
  iconSize,
  disabled,
  isLoading,
}: Props) => (
  <div
    onClick={disabled || onClick}
    className={classNames(
      'j-button', {
        '-loading': isLoading,
        '-with-text': text,
      }, prop(color, {
        blue: '-blue',
        white: '-white',
      }),
      large ? '-large' : '-regular',
      minimal && '-minimal'
    )}
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

type Props = {
 color: 'white' | 'blue',
 onClick?: Function,
 text?: string,
 iconName?: string,
 iconSize?: 'small' | 'medium',
 large?: boolean,
 minimal?: boolean,
 disabled?: boolean,
 isLoading?: boolean,
}

JButton.defaultProps = {
  onClick: empty,
  text: undefined,
  iconName: undefined,
  iconSize: 'small',
  large: false,
  minimal: false,
  disabled: false,
  isLoading: false,
}

export default JButton
