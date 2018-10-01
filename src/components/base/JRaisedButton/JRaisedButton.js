// @flow

import React from 'react'
import classNames from 'classnames'
import handle from 'utils/eventHandlers/handle'

import { JIcon, JText, JLoader } from 'components/base'

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
  isDisabled,
  isLoading,
  isHovered,
}: Props) => {
  const buttonClassName = classNames(
    `j-raised-button -${color}`,
    isWide && '-wide',
    isDisabled && '-disabled',
  )

  const labelColorHovered = labelColor === 'blue' ? 'white' : 'white'

  if (isLoading) {
    return (
      <div className={`${buttonClassName} -loading`}>
        <JLoader color={loaderColor} />
      </div>
    )
  }

  return (
    <div
      onClick={isDisabled ? null : onClick}
      onMouseEnter={handle(onHover)(true)}
      onMouseLeave={handle(onHover)(false)}
      className={buttonClassName}
    >
      {iconName && (
        <div className='icon'>
          <JIcon name={iconName} size={iconSize} color={iconColor} />
        </div>
      )}
      <div className='label'>
        <JText value={label} color={isHovered ? labelColorHovered : labelColor} weight='bold' />
      </div>
    </div>
  )
}

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
 isDisabled: boolean,
 isLoading: boolean,
 isHovered: boolean,
}

JRaisedButton.defaultProps = {
  color: 'white',
  iconName: null,
  iconSize: 'small',
  iconColor: 'white',
  labelColor: 'white',
  loaderColor: 'white',
  isWide: false,
  isDisabled: false,
  isLoading: false,
}

export default JRaisedButton
