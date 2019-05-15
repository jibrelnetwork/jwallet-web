// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { omit } from 'lodash-es'

import { JLoader } from 'components/base'
import { type JLoaderColor } from 'components/base/JLoader/JLoader'

import jRaisedButtonStyle from './jRaisedButton.m.scss'

type Theme = 'blue' | 'white' | 'gray' | 'additional' | 'additional-icon'

type Props =
  StyleComponent<Theme>
  & {
  +onClick: Function,
  +children: React$Node,
  +isLoading: boolean,
  +isDisabled: boolean,
}

const loaderColorMap: { [Theme]: JLoaderColor } = {
  blue: 'blue',
  white: 'white',
  gray: 'gray',
  additional: 'blue',
  'additional-icon': 'blue',
}

class JRaisedButton extends PureComponent<Props, *> {
  static defaultProps = {
    onClick: null,
    children: null,
    theme: 'blue',
    isLoading: false,
    isDisabled: false,
    className: undefined,
  }

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
      '__j-raised-button',
      this.props.className,
      jRaisedButtonStyle.core,
      jRaisedButtonStyle[theme],
      isLoading && jRaisedButtonStyle.loading,
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

export default JRaisedButton
