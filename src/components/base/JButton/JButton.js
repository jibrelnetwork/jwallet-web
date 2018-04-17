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
  wide,
  disabled,
  isLoading,
}: Props) => {
  if (isLoading) {
    return <div className='j-button -loading' />
  }

  return (
    <div
      onClick={disabled ? null : onClick}
      className={classNames(`j-button -${color}`, disabled && '-disabled', wide && '-wide')}
    >
      {iconName && (
        <div className='icon'>
          <JIcon name={iconName} size={iconSize} color={iconColor || color} />
        </div>
      )}
      <JText
        value={text}
        weight='bold'
        color={(color === 'white') ? 'blue' : 'white'}
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
 wide: boolean,
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
  wide: false,
  disabled: false,
  isLoading: false,
}

export default JButton
