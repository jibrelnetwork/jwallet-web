// @flow

import React from 'react'
import classNames from 'classnames'

import handle from 'utils/eventHandlers/handle'
import { JIcon, JText, JLoader } from 'components/base'

type Props = {
  onClick: Function,
  onHover: Function,
  label: string,
  iconName: ?string,
  color: 'blue' | 'white',
  iconColor: 'blue' | 'white',
  iconSize: 'small' | 'medium',
  labelColor: 'blue' | 'white',
  loaderColor: 'blue' | 'white',
  isWide: boolean,
  isLoading: boolean,
  isHovered: boolean,
  isDisabled: boolean,
}

const JRaisedButton = ({
  onClick,
  onHover,
  label,
  color,
  iconName,
  iconSize,
  iconColor,
  labelColor,
  loaderColor,
  isWide,
  isLoading,
  isHovered,
  isDisabled,
}: Props) => {
  const buttonClassName = classNames(
    `j-raised-button -${color}`,
    isWide && '-wide',
    isLoading && '-loading',
    isDisabled && '-disabled',
  )

  if (isLoading) {
    return (
      <div className={buttonClassName}>
        <JLoader color={loaderColor} />
      </div>
    )
  }

  return (
    <div
      onMouseEnter={handle(onHover)(true)}
      onMouseLeave={handle(onHover)(false)}
      onClick={isDisabled ? undefined : onClick}
      className={buttonClassName}
    >
      {iconName && (
        <div className='icon'>
          <JIcon name={iconName} size={iconSize} color={iconColor} />
        </div>
      )}
      <div className='label'>
        <JText value={label} color={isHovered ? 'white' : labelColor} weight='bold' />
      </div>
    </div>
  )
}

export default JRaisedButton
