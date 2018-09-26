// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import { JIcon, JLoader, JText } from 'components/base'

type Props = {
  onClick: (SyntheticEvent<HTMLDivElement>) => void,
  label?: ?string,
  color?: 'blue' | 'gray' | 'sky' | 'white',
  iconName?: ?string,
  iconSize?: 'small' | 'medium',
  iconColor?: 'blue' | 'gray' | 'sky' | 'white',
  isOpaque?: boolean,
  isLoading?: boolean,
  isDisabled?: boolean,
  isTransparent?: boolean
}

class JFlatButton extends PureComponent<Props, *> {
  static defaultProps = {
    text: null,
    label: null,
    color: 'white',
    iconName: null,
    iconSize: 'small',
    iconColor: 'white',
    isOpaque: false,
    isLoading: false,
    isDisabled: false,
    isTransparent: false,
  }

  render() {
    const {
      onClick,
      label,
      color,
      iconName,
      iconSize,
      iconColor,
      isOpaque,
      isLoading,
      isDisabled,
      isTransparent,
    } = this.props

    if (isLoading) {
      return (
        <div className='j-flat-button -loading'>
          <JLoader color='white' />
        </div>
      )
    }

    return (
      <div
        onClick={isDisabled ? null : onClick}
        className={classNames(
          'j-flat-button',
          label && '-label',
          isOpaque && '-opaque',
          isDisabled && '-disabled',
          isTransparent && '-transparent',
        )}
      >
        {iconName && iconSize && iconColor && (
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
}

export default JFlatButton
