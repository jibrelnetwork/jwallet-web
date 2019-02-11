// @flow

import classNames from 'classnames'

import React, {
  Fragment,
  PureComponent,
} from 'react'

import { Link } from 'react-router'

import handle from 'utils/eventHandlers/handle'

import {
  JIcon,
  JText,
  JLoader,
} from 'components/base'

import type {
  JIconSize,
  JIconColor,
} from 'components/base/JIcon/JIcon'

export type JFlatButtonColor = 'blue' | 'gray' | 'sky' | 'white'
export type JFlatButtonHandler = (SyntheticEvent<HTMLDivElement>) => void

type Props = {|
  +onClick: ?JFlatButtonHandler,
  +to: ?string,
  +label: ?string,
  +iconName: ?string,
  +iconSize: JIconSize,
  +iconColor: JIconColor,
  +color: JFlatButtonColor,
  +isLink: boolean,
  +isLoading: boolean,
  +isDisabled: boolean,
  +isBordered: boolean,
  +isTransparent: boolean,
  +isUnderscored: boolean,
  +isHoverOpacity: boolean,
|}

type BaseProps = {|
  +onMouseEnter: (SyntheticEvent<any>) => void,
  +onMouseLeave: (SyntheticEvent<any>) => void,
  +className: string,
|}

type StateProps = {|
  isHovered: boolean,
|}

class JFlatButton extends PureComponent<Props, StateProps> {
  static defaultProps = {
    onClick: null,
    to: null,
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
      to,
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

    const children: React$Node = (
      <Fragment>
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
      </Fragment>
    )

    const baseProps: BaseProps = {
      onMouseEnter: handle(this.onHover)(true),
      onMouseLeave: handle(this.onHover)(false),
      className: classNames(
        `j-flat-button -${color}`,
        label && '-label',
        isLink && '-link',
        isBordered && '-border',
        isDisabled && '-disabled',
        isTransparent && '-transparent',
        isUnderscored && '-underscored',
        isHoverOpacity && '-hover-opacity',
      ),
    }

    if (isDisabled) {
      return (
        <div {...baseProps}>
          {children}
        </div>
      )
    }

    if (onClick && !to) {
      return (
        <div
          {...baseProps}
          onClick={onClick}
        >
          {children}
        </div>
      )
    }

    if (to && !onClick) {
      return (
        <Link
          {...baseProps}
          to={to}
        >
          {children}
        </Link>
      )
    }

    return null
  }
}

export default JFlatButton
