// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import { JIcon, JLoader, JText } from 'components/base'

type Props = {|
  +onClick: (SyntheticEvent<HTMLDivElement>) => void,
  +label: ?string,
  +color: 'blue' | 'gray' | 'sky' | 'white',
  +iconName: ?string,
  +iconSize: 'small' | 'medium',
  +iconColor: 'blue' | 'gray' | 'sky' | 'white',
  +isLink: boolean,
  +isLoading: boolean,
  +isDisabled: boolean,
  +isBordered: boolean,
  +isHoverOpacity: boolean,
|}

class JFlatButton extends PureComponent<Props, *> {
  static defaultProps = {
    text: null,
    color: 'white',
    iconName: null,
    iconSize: 'small',
    iconColor: 'white',
    isLink: false,
    isLoading: false,
    isDisabled: false,
    isBordered: true,
    isHoverOpacity: false,
  }

  render() {
    const {
      onClick,
      label,
      color,
      isLink,
      iconName,
      iconSize,
      iconColor,
      isLoading,
      isDisabled,
      isBordered,
      isHoverOpacity,
    } = this.props

    if (isLoading) {
      return (
        <div className={classNames('j-flat-button -loading', `-${color}`)}>
          <JLoader color={color} />
        </div>
      )
    }

    return (
      <div
        onClick={isDisabled ? undefined : onClick}
        className={classNames(
          'j-flat-button',
          `-${color}`,
          isLink && '-link',
          label && '-label',
          isDisabled && '-disabled',
          !isBordered && '-no-border',
          isHoverOpacity && '-hover-opacity',
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
}

export default JFlatButton
