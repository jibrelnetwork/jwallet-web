// @flow

import React from 'react'
import classNames from 'classnames'

import { JIcon, JText, JLoader } from 'components/base'

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
  const buttonClassName = classNames(`j-button -${color}`, disabled && '-disabled', wide && '-wide')

  if (isLoading) {
    return (
      <div className={`${buttonClassName} -loading`}>
        <JLoader />
      </div>
    )
  }

  return (
    <div onClick={disabled ? null : onClick} className={buttonClassName}>
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
