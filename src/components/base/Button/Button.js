// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { omit } from 'lodash-es'

import { JLoader } from 'components/base'
import { type JLoaderColor } from 'components/base/JLoader/JLoader'

import buttonStyle from 'components/base/Button/button.m.scss'

type Theme = 'blue' | 'white' | 'additional' | 'additional-icon'

type Props =
  StyleComponent<Theme>
  & {
  +onClick: Function,
  +children: React$Node,
  +isLoading: boolean,
  +isDisabled: boolean,
}

const loaderColorMap: { [Theme]: JLoaderColor } = {
  blue: 'white',
  white: 'blue',
  additional: 'blue',
  'additional-icon': 'blue',
}

export class Button extends PureComponent<Props, *> {
  static defaultProps = {
    onClick: null,
    children: null,
    theme: 'blue',
    isLoading: false,
    isDisabled: false,
    className: undefined,
  }

  static iconClassName = buttonStyle.icon

  render() {
    const {
      onClick,
      theme,
      isLoading,
      isDisabled,
    }: Props = this.props

    const omittedProps = omit(this.props, [
      'onClick',
      'children',
      'theme',
      'className',
      'isLoading',
      'isDisabled',
    ])

    const buttonClassName = classNames(
      '__button',
      this.props.className,
      buttonStyle.core,
      buttonStyle[theme],
      isLoading && buttonStyle.loading,
    )

    return (
      <button
        type='button'
        {...omittedProps}
        onClick={onClick}
        className={buttonClassName}
        disabled={isDisabled || isLoading}
      >
        {isLoading
          ? <JLoader color={loaderColorMap[this.props.theme]} />
          : this.props.children
        }
      </button>
    )
  }
}
