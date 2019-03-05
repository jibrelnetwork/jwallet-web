// @flow

import { omit } from 'lodash-es'
import classNames from 'classnames'
import React, { PureComponent } from 'react'

import {
  JLoader,
} from 'components/base'

import type { JLoaderColor } from 'components/base/JLoader/JLoader'

type Themes = 'blue' | 'white' | 'gray'

type Props = {
  +children: React$Node,
  +onClick: Function,
  +theme: Themes,
  +isLoading: boolean,
  +disabled: boolean,
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
    isLoading: false,
    disabled: false,
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
    ])

    const buttonClassName = classNames(
      'j-raised-button',
      `-${this.props.theme}`,
      isLoading && '-loading')

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
