// @flow

import React from 'react'
import classNames from 'classnames'

import { JIcon, JLoader, JText } from 'components/base'

const JFlatButton = ({
  onClick,
  label,
  color,
  iconName,
  iconSize,
  iconColor,
  isLoading,
  isDisabled,
  isTransparent,
}: Props) => {
  if (isLoading) {
    return (
      <div className='j-flat-button -loading'>
        <JLoader />
      </div>
    )
  }

  return (
    <div
      onClick={isDisabled ? null : onClick}
      className={classNames(
        'j-flat-button',
        label && '-label',
        isDisabled && '-disabled',
        isTransparent && '-transparent',
      )}
    >
      {iconName && (
        <div className='icon'>
          <JIcon name={iconName} size={iconSize} color={iconColor} />
        </div>
      )}
      {label && (
        <JText value={label} color={color} weight='bold' />
      )}
    </div>
  )
}

type Props = {
 onClick: Function,
 label: ?string,
 color: 'blue' | 'gray' | 'white',
 iconName: ?string,
 iconSize: 'small' | 'medium',
 iconColor: 'blue' | 'gray' | 'white',
 isLoading: boolean,
 isDisabled: boolean,
 isTransparent: boolean,
}

JFlatButton.defaultProps = {
  text: null,
  color: 'white',
  iconName: null,
  iconSize: 'small',
  iconColor: 'white',
  isLoading: false,
  isDisabled: false,
  isTransparent: false,
}

export default JFlatButton
