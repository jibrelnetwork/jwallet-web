// @flow

import classNames from 'classnames'

import React, {
  Fragment,
  PureComponent,
} from 'react'

import handle from 'utils/eventHandlers/handle'

import {
  JIcon,
  JLoader,
} from 'components/base'

import { type JIconColor } from 'components/base/JIcon/JIcon'

import jTextStyle from 'styles/components/jText.m.scss'
import style from './jFlatButton.m.scss'

export type JFlatButtonColor = 'blue' | 'gray' | 'sky' | 'white'
export type JFlatButtonHandler = (SyntheticEvent<HTMLDivElement>) => void

type Props = {|
  +onClick: ?JFlatButtonHandler,
  +label: ?string,
  +iconName: ?string,
  +iconColor: JIconColor,
  +color: JFlatButtonColor,
  +isLink: boolean,
  +isLoading: boolean,
  +isDisabled: boolean,
  +isBordered: boolean,
  +isTransparent: boolean,
  +isUnderscored: boolean,
  +isHoverOpacity: boolean,
  title?: string,
|}

type BaseProps = {|
  +onMouseEnter: (SyntheticEvent<any>) => void,
  +onMouseLeave: (SyntheticEvent<any>) => void,
  +className: string,
  title?: string,
|}

type StateProps = {|
  isHovered: boolean,
|}

class JFlatButton extends PureComponent<Props, StateProps> {
  static defaultProps = {
    onClick: null,
    label: null,
    iconName: null,
    color: 'white',
    iconColor: 'white',
    isLink: false,
    isLoading: false,
    isDisabled: false,
    isBordered: false,
    isTransparent: false,
    isUnderscored: false,
    isHoverOpacity: false,
    title: undefined,
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
      iconColor,
      isLoading,
      isDisabled,
      isBordered,
      isTransparent,
      isUnderscored,
      isHoverOpacity,
      title,
    } = this.props

    const {
      isHovered,
    }: StateProps = this.state

    if (isLoading) {
      return (
        <div className={classNames(
          style['j-flat-button'],
          style['-loading'],
          style[`-${color}`],
          isBordered && style['-border'])}
        >
          <JLoader color={color} />
        </div>
      )
    }

    const isUnderscoredAndHovered: boolean = (isUnderscored && isHovered)

    const children: React$Node = (
      <Fragment>
        {iconName && (
          <div className='icon'>
            <JIcon name={iconName} color={iconColor} />
          </div>
        )}
        {label && (
          <span
            className={classNames(
              jTextStyle['j-text'],
              isUnderscored ? jTextStyle.underline : jTextStyle.bold,
              isUnderscoredAndHovered ? jTextStyle.sky : jTextStyle[color],
            )}
          >{label}
          </span>
        )}
      </Fragment>
    )

    const baseProps: BaseProps = {
      onMouseEnter: handle(this.onHover)(true),
      onMouseLeave: handle(this.onHover)(false),
      className: classNames(
        style['j-flat-button'],
        style[`-${color}`],
        label && style['-label'],
        isLink && style['-link'],
        isBordered && style['-border'],
        isDisabled && style['-disabled'],
        isTransparent && style['-transparent'],
        isUnderscored && style['-underscored'],
        isHoverOpacity && style['-hover-opacity'],
      ),
      title,
    }

    if (isDisabled) {
      return (
        <div {...baseProps}>
          {children}
        </div>
      )
    }

    if (onClick) {
      return (
        <div
          {...baseProps}
          onClick={onClick}
        >
          {children}
        </div>
      )
    }

    return null
  }
}

export default JFlatButton
