// @flow

import React from 'react'
import classNames from 'classnames'

import { JIcon, JText } from 'components/base'

const JFlatButton = ({
  onClick,
  text,
  color,
  iconName,
  iconSize,
  iconColor,
  disabled,
  isLoading,
  transparent,
}: Props) => {
  if (isLoading) {
    return <div className='j-flat-button -loading' />
  }

  return (
    <div
      onClick={disabled ? null : onClick}
      className={classNames(
        'j-flat-button',
        text && '-text',
        disabled && '-disabled',
        transparent && '-transparent',
      )}
    >
      {iconName && (
        <div className='icon'>
          <JIcon name={iconName} size={iconSize} color={iconColor || color} />
        </div>
      )}
      {text && (
        <JText value={text} variants={[color, 'bold', 'normal']} />
      )}
    </div>
  )
}

type Props = {
 onClick: Function,
 text: ?string,
 color: 'blue' | 'gray' | 'white',
 iconName: ?string,
 iconSize: 'small' | 'medium',
 iconColor: 'blue' | 'gray' | 'white' | null,
 disabled: boolean,
 isLoading: boolean,
 transparent: boolean,
}

JFlatButton.defaultProps = {
  onClick: () => {},
  text: null,
  color: 'white',
  iconName: null,
  iconColor: null,
  iconSize: 'small',
  disabled: false,
  isLoading: false,
  transparent: false,
}

export default JFlatButton
