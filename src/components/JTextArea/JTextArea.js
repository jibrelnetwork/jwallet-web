// @flow

import React, { PureComponent } from 'react'
import {
  noop,
  omit,
  kebabCase,
} from 'lodash-es'
import classNames from 'classnames'

import jTextAreaStyle from './jTextArea.m.scss'

type Theme = 'white'

type Props =
  StyleComponent<Theme>
  & {
    onChange?: Function,
    onBlur?: Function,
    onFocus?: Function,
    label?: string,
    id?: string,
    value?: any, // In common case it will be string, but in React value of input has type `any`
    rows?: number,
    error?: boolean,
    disabled?: boolean,
  }

type State = {
  focused: boolean,
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

export class JTextArea extends PureComponent<Props, State> {
  static defaultProps = {
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    theme: 'white',
    className: undefined,
    label: undefined,
    id: undefined,
    value: undefined,
    rows: 1,
    error: false,
    disabled: false,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      focused: String(this.props.value).length > 0,
    }
  }

  handleChange = (event: SyntheticEvent<HTMLTextAreaElement>): void => {
    heightCalc(event)
    this.props.onChange(event)
  }

  handleBlur = (event: SyntheticEvent<HTMLTextAreaElement>): void => {
    if (String(this.props.value).length <= 0) {
      this.setState({ focused: false })
    }

    this.props.onBlur(event)
  }

  handleFocus = (event: SyntheticEvent<HTMLTextAreaElement>): void => {
    this.setState({ focused: true })
    this.props.onFocus(event)
  }

  render() {
    const omittedProps = omit(this.props, [
      'onChange',
      'children',
      'theme',
      'label',
      'id',
      'className',
      'placeholder',
      'error',
    ])

    const elementID: string = kebabCase(this.props.label) || undefined

    return (
      <div
        id={this.props.id}
        className={classNames(
          't-jtextarea',
          jTextAreaStyle.core,
          jTextAreaStyle[this.props.theme],
          this.props.error && jTextAreaStyle.error,
          this.state.focused && jTextAreaStyle.focused,
          this.props.disabled && jTextAreaStyle.disabled,
          this.props.className,
        )}
      >
        {elementID && (
          <label
            className={classNames(
              't-jtextarea-label',
              jTextAreaStyle.label,
            )}
            htmlFor={elementID}
          >
            {this.props.label}
          </label>)}
        <textarea
          {...omittedProps}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          id={elementID}
          className={classNames('t-jtextarea-input', jTextAreaStyle.input)}
        />
      </div>
    )
  }
}
