// @flow

import React from 'react'
import classNames from 'classnames'

import { JIcon, JText } from 'components/base'

const JButton = ({
  onClick,
  text,
  color,
  iconName,
  iconSize,
  iconColor,
  disabled,
  isLoading,
}: Props) => {
  if (isLoading) {
    return <div className='j-button -loading' />
  }

  return (
    <div
      onClick={disabled ? null : onClick}
      className={classNames(`j-button -${color}`, disabled && '-disabled')}
    >
      {iconName && (
        <div className='icon'>
          <JIcon name={iconName} size={iconSize} color={iconColor || color} />
        </div>
      )}
      <JText
        value={text}
        variants={['bold', 'normal', (color === 'white') ? 'blue' : 'white']}
      />
    </div>
  )
}

type Props = {
 onClick: Function,
 text: string,
 color: 'white' | 'blue',
 iconName: string,
 iconSize: 'small' | 'medium',
 iconColor: 'blue' | 'white' | null,
 disabled: boolean,
 isLoading: boolean,
}

JButton.defaultProps = {
  onClick: () => {},
  text: '',
  color: 'white',
  iconName: null,
  iconSize: 'small',
  iconColor: null,
  disabled: false,
  isLoading: false,
}

export default JButton
