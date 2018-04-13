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
}: Props) => {
  if (isLoading) {
    return <div className='j-flat-button -loading' />
  }

  return (
    <div
      onClick={disabled ? null : onClick}
      className={classNames('j-flat-button', disabled && '-disabled')}
    >
      {iconName && (
        <div className='icon'>
          <JIcon name={iconName} size={iconSize} color={iconColor} />
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
 color: 'white' | 'blue',
 iconName: ?string,
 iconSize: 'small' | 'medium',
 iconColor: 'white' | 'blue',
 disabled: boolean,
 isLoading: boolean,
}

JFlatButton.defaultProps = {
  onClick: () => {},
  disabled: false,
  isLoading: false,
  text: null,
  color: 'white',
  iconName: null,
  iconSize: 'small',
  iconColor: 'white',
}

export default JFlatButton
