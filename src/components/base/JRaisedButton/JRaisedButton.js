// @flow

import React from 'react'
import classNames from 'classnames'

import { JIcon, JText, JLoader } from 'components/base'

const JRaisedButton = ({
  onClick,
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
}: Props) => {
  const buttonClassName = classNames(
    `j-raised-button -${color}`,
    isWide && '-wide',
    isDisabled && '-disabled',
  )

  if (isLoading) {
    return (
      <div className={`${buttonClassName} -loading`}>
        <JLoader color={loaderColor} />
      </div>
    )
  }

  return (
    <div onClick={isDisabled ? null : onClick} className={buttonClassName}>
      {iconName && (
        <div className='icon'>
          <JIcon name={iconName} size={iconSize} color={iconColor} />
        </div>
      )}
      <div className='label'><JText value={label} color={labelColor} weight='bold' /></div>
    </div>
  )
}

type Props = {
 onClick: Function,
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
