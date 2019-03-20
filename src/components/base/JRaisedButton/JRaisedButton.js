// @flow

import { omit } from 'lodash-es'
import classNames from 'classnames'
import React, { PureComponent } from 'react'

import JLoader, { type JLoaderColor } from 'components/base/JLoader/JLoader'

import jRaisedButtonStyle from './jRaisedButton.m.scss'

type Themes = 'blue' | 'white' | 'gray'

type Props = {
  children: React$Node,
  theme: Themes,
  onClick?: Function,
  isLoading?: boolean,
  disabled?: boolean,
  className?: ?string,
}

const loaderColorMap: { [Themes]: JLoaderColor } = {
  blue: 'white',
  white: 'blue',
  gray: 'dark',
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
        {isLoading ?
          <JLoader color={loaderColorMap[this.props.theme]} />
          : this.props.children
        }
      </button>
    )
  }
}

export default JRaisedButton
