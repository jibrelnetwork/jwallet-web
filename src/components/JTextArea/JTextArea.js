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
    label: string,
    id?: string,
    value?: any, // In common case it will be string, but in React value of input is `any` type
    rows?: number,
    error?: boolean,
    disabled?: boolean,
  }

type State = {
  focused: boolean,
}

const MAX_ROWS = 12

async function heightCalc(
  { currentTarget: target }: SyntheticEvent<HTMLTextAreaElement>,
): Promise<void> {
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
    value: '',
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
    const omitedProps = omit(this.props, [
      'onChange',
      'children',
      'theme',
      'label',
      'id',
      'className',
      'value',
      'rows',
      'placeholder',
      'error',
    ])

    const elementID: string = kebabCase(this.props.label) || undefined

    return (
      <div
        id={this.props.id}
        className={classNames(
          jTextAreaStyle.core,
          jTextAreaStyle[this.props.theme],
          this.props.error && jTextAreaStyle.error,
          this.state.focused && jTextAreaStyle.focused,
          this.props.disabled && jTextAreaStyle.disabled,
          this.props.className,
        )}
      >
        {elementID && (
          <label className={classNames(jTextAreaStyle.label)} htmlFor={elementID}>
            {this.props.label}
          </label>)}
        <textarea
          {...omitedProps}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          id={elementID}
          className={classNames(jTextAreaStyle.input)}
          value={this.props.value}
          rows={this.props.rows}
          disabled={this.props.disabled}
        />
      </div>
    )
  }
}
