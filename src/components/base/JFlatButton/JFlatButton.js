// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import handle from 'utils/eventHandlers/handle'
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
  +isTransparent: boolean,
  +isUnderscored: boolean,
  +isHoverOpacity: boolean,
|}

type StateProps = {|
  isHovered: boolean,
|}

class JFlatButton extends PureComponent<Props, StateProps> {
  static defaultProps = {
    label: null,
    iconName: null,
    color: 'white',
    iconSize: 'small',
    iconColor: 'white',
    isLink: false,
    isLoading: false,
    isDisabled: false,
    isBordered: false,
    isTransparent: false,
    isUnderscored: false,
    isHoverOpacity: false,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isHovered: false,
    }
  }

  onHover = (isHovered: boolean) => {
    this.setState({ isHovered })
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
      isTransparent,
      isUnderscored,
      isHoverOpacity,
    } = this.props

    const {
      isHovered,
    }: StateProps = this.state

    if (isLoading) {
      return (
        <div className={classNames('j-flat-button -loading', `-${color}`, isBordered && '-border')}>
          <JLoader color={color} />
        </div>
      )
    }

    const isUnderscoredAndHovered: boolean = (isUnderscored && isHovered)

    return (
      <div
        onClick={isDisabled ? null : onClick}
        onMouseEnter={handle(this.onHover)(true)}
        onMouseLeave={handle(this.onHover)(false)}
        className={classNames(
          `j-flat-button -${color}`,
          label && '-label',
          isLink && '-link',
          isBordered && '-border',
          isDisabled && '-disabled',
          isTransparent && '-transparent',
          isUnderscored && '-underscored',
          isHoverOpacity && '-hover-opacity',
        )}
      >
        {iconName && (
          <div className='icon'>
            <JIcon name={iconName} size={iconSize} color={iconColor} />
          </div>
        )}
        {label && (
          <JText
            value={label}
            weight={isUnderscored ? null : 'bold'}
            color={isUnderscoredAndHovered ? 'sky' : color}
            decoration={isUnderscored ? 'underline' : null}
          />
        )}
      </div>
    )
  }
}

export default JFlatButton
