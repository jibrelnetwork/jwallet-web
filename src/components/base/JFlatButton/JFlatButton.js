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
  +hasNotBorder: boolean,
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
    hasNotBorder: false,
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
      isHoverOpacity,
      hasNotBorder,
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
        onClick={isDisabled ? null : onClick}
        className={classNames(
          'j-flat-button',
          `-${color}`,
          isLink && '-link',
          label && '-label',
          hasNotBorder && '-no-border',
          isDisabled && '-disabled',
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
