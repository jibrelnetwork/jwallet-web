// @flow

import classNames from 'classnames'

import React, {
  Fragment,
  PureComponent,
} from 'react'

import {
  JIcon,
  JLoader,
  JLink,
} from 'components/base'

import jTextStyle from 'styles/components/jText.m.scss'

import { type JIconColor } from 'components/base/JIcon/JIcon'

export type JFlatButtonColor = 'blue' | 'gray' | 'sky' | 'white'
export type JFlatButtonHandler = (SyntheticEvent<HTMLDivElement>) => void

type Props = {|
  +className: ?string,
  +onClick: ?JFlatButtonHandler,
  +to: ?string,
  +label: ?string,
  +iconName: ?string,
  +iconColor: JIconColor,
  +color: JFlatButtonColor,
  +isLink: boolean,
  +isLoading: boolean,
  +isDisabled: boolean,
  +isBordered: boolean,
  +isTransparent: boolean,
  +isHoverOpacity: boolean,
  title?: string,
|}

type BaseProps = {|
  +className: string,
  title?: string,
|}

class JFlatButton extends PureComponent<Props, *> {
  static defaultProps = {
    className: null,
    onClick: null,
    to: null,
    label: null,
    iconName: null,
    color: 'white',
    iconColor: 'white',
    isLink: false,
    isLoading: false,
    isDisabled: false,
    isBordered: false,
    isTransparent: false,
    isHoverOpacity: false,
    title: undefined,
  }

  render() {
    const {
      className,
      onClick,
      to,
      label,
      color,
      isLink,
      iconName,
      iconColor,
      isLoading,
      isDisabled,
      isBordered,
      isTransparent,
      isHoverOpacity,
      title,
    } = this.props

    if (isLoading) {
      return (
        <div
          className={classNames(
            className,
            'j-flat-button -loading',
            jTextStyle[color],
            `-${color}`,
            isBordered && '-border',
          )}
        >
          <JLoader color={color} />
        </div>
      )
    }

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
              jTextStyle.core,
              jTextStyle.bold,
              jTextStyle[color],
            )}
          >
            {label}
          </span>
        )}
      </Fragment>
    )

    const baseProps: BaseProps = {
      className: classNames(
        className,
        jTextStyle[color],
        `j-flat-button -${color}`,
        label && '-label',
        isLink && '-link',
        isBordered && '-border',
        isDisabled && '-disabled',
        isTransparent && '-transparent',
        isHoverOpacity && '-hover-opacity',
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
        <JLink
          {...baseProps}
          href={to}
        >
          {children}
        </JLink>
      )
    }

    return null
  }
}

export default JFlatButton
