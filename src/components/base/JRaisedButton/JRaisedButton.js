// @flow

import { omit } from 'lodash-es'
import classNames from 'classnames'
import React, { PureComponent } from 'react'

import JLoader, { type JLoaderColor } from 'components/base/JLoader/JLoader'

import jRaisedButtonStyle from './jRaisedButton.m.scss'

export type JButtonThemes =
  'blue' | 'white' | 'gray' | 'flat-white-pale' | 'flat-white-bright' | 'flat-blue'

type Props = {
  children: React$Node,
  theme: JButtonThemes,
  onClick?: Function,
  isLoading?: boolean,
  disabled?: boolean,
  className?: ?string,
}

const loaderColorMap: { [JButtonThemes]: JLoaderColor } = {
  blue: 'white',
  white: 'blue',
  gray: 'dark',
  'flat-white-bright': 'gray',
  'flat-white-pale': 'gray',
  'flat-blue': 'white',
}

class JRaisedButton extends PureComponent<Props, *> {
  static defaultProps = {
    children: null,
    theme: 'blue',
    onClick: undefined,
    isLoading: false,
    disabled: undefined,
    className: undefined,
  }

  render() {
    const {
      isLoading,
      disabled,
    }: Props = this.props

    const omittedProps = omit(this.props, [
      'children',
      'onClick',
      'className',
      'isLoading',
      'theme',
      'disabled',
    ])

    const buttonClassName = classNames(
      this.props.className,
      jRaisedButtonStyle.core,
      jRaisedButtonStyle[this.props.theme],
      isLoading && jRaisedButtonStyle.loading)

    const isDisabled = typeof disabled !== 'undefined' ? disabled : isLoading

    return (
      <button
        type='button'
        {...omittedProps}
        className={buttonClassName}
        onClick={this.props.onClick}
        disabled={isDisabled}
      >
        <span className={jRaisedButtonStyle.content}>
          {isLoading ?
            <JLoader color={loaderColorMap[this.props.theme]} />
            : this.props.children
          }
        </span>
      </button>
    )
  }
}

export default JRaisedButton
