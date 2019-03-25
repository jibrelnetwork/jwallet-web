// @flow

import React, { PureComponent } from 'react'
import { omit } from 'lodash-es'
import classNames from 'classnames'

import jTextAreaStyle from './jTextArea.m.scss'

type Theme = 'blue'

type Props =
  StyleComponent<Theme>
  & {
    onChange: Function,
    onBlur?: Function,
    onFocus?: Function,
  }

const MAX_ROWS = 12

function heightCalc({ currentTarget: target }: SyntheticEvent<HTMLTextAreaElement>): void {
  if (target) {
    while (target.clientHeight < target.scrollHeight && target.rows <= MAX_ROWS) {
      // mutating the DOM
      // eslint-disable-next-line fp/no-mutation, no-param-reassign
      target.rows += 1
    }
  }
}

export class JTextArea extends PureComponent<Props, void> {
  static defaultProps = {
    onBlur: undefined,
    onFocus: undefined,
    theme: 'blue',
    className: undefined,
  }

  handleChange = (fieldEvent: SyntheticEvent<HTMLTextAreaElement>): void => {
    heightCalc(fieldEvent)
    this.props.onChange(fieldEvent)
  }

  render() {
    const omitedProps = omit(this.props, [
      'children',
      'onChange',
      'theme',
      'className',
    ])

    return (
      <textarea
        {...omitedProps}
        className={classNames(
          jTextAreaStyle.core,
          jTextAreaStyle[this.props.theme],
          this.props.className,
        )}
        onChange={this.handleChange}
      />
    )
  }
}
