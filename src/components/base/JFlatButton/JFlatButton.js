// @flow

import React from 'react'
import classNames from 'classnames'

import { JIcon, JLoader, JText } from 'components/base'

const JFlatButton = ({
  onClick,
  label,
  color,
  isLink,
  iconName,
  iconSize,
  iconColor,
  isLoading,
  isDisabled,
}: Props) => {
  if (isLoading) {
    return (
      <div className={classNames('j-flat-button -loading', `-${color}`)}>
        <JLoader color={color} />
      </div>
    )
  }

  return (
    <div
      onClick={isDisabled ? null : onClick}
      className={classNames(
        'j-flat-button',
        `-${color}`,
        isLink && '-link',
        label && '-label',
        isDisabled && '-disabled',
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
 color: 'blue' | 'gray' | 'sky' | 'white',
 iconName: ?string,
 iconSize: 'small' | 'medium',
 iconColor: 'blue' | 'gray' | 'sky' | 'white',
 isLink: boolean,
 isLoading: boolean,
 isDisabled: boolean,
}

JFlatButton.defaultProps = {
  text: null,
  color: 'white',
  iconName: null,
  iconSize: 'small',
  iconColor: 'white',
  isLink: false,
  isLoading: false,
  isDisabled: false,
}

export default JFlatButton
