// @flow strict

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { camelCase } from 'lodash-es'

import getErrorMessage from 'utils/form/getErrorMessage'
import JFieldMessage from 'components/base/JFieldMessage'

import styles from './jInputField.m.scss'

export type JInputTheme = 'white' | 'white-icon' | 'white-indicator'
export type JInputType = 'text' | 'password'

export type JInputFieldProps = {|
  +meta: FinalFormMeta,
  +input: FinalFormInput,
  +id: ?string,
  +label: string,
  +type: JInputType,
  +theme: JInputTheme,
  +className: ?string,
  +placeholder: string,
  +infoMessage: ?string,
  +errorMessage: ?string,
  +validateType: FinalFormValidateType,
  +isDisabled: boolean,
  +isAutoFocus: boolean,
|}

type InputRef = {
  current: null | HTMLInputElement,
}

export default class JInputField extends PureComponent<JInputFieldProps> {
  static defaultProps = {
    meta: {},
    input: {},
    id: null,
    label: '',
    type: 'text',
    theme: 'white',
    className: null,
    placeholder: '',
    infoMessage: null,
    errorMessage: null,
    validateType: 'dirtySinceLastSubmit',
    isDisabled: false,
    isAutoFocus: false,
  }

  textInput: InputRef = React.createRef()

  handleFocus = () => {
    if (this.textInput.current) {
      this.textInput.current.focus()
    }
  }

  render() {
    const {
      meta,
      input,
      id,
      type,
      label,
      theme,
      className,
      placeholder,
      infoMessage,
      errorMessage,
      validateType,
      isDisabled,
      isAutoFocus,
      ...rest
    } = this.props

    const errorMsg: ?string = errorMessage || getErrorMessage(meta, validateType)

    const hasLabel: boolean = !!label
    const hasError: boolean = !!errorMsg
    const hasInfo: boolean = !!infoMessage
    const hasValue: boolean = !!input.value
    const hasPlaceholder: boolean = !!placeholder
    const hasMessage: boolean = (hasError || hasInfo)
    const isActive: boolean = meta.active || hasValue || (hasLabel && hasPlaceholder)
    const inputId: string = id || `${camelCase(input.name || label || placeholder || 'noname')}Id`

    return (
      <div
        className={classNames(
          '__j-input-field',
          styles.core,
          styles[theme],
          className,
        )}
      >
        <div
          onClick={this.handleFocus}
          className={classNames(
            styles.wrap,
            hasError && styles.error,
            isActive && styles.active,
            hasMessage && styles.message,
            isDisabled && styles.disabled,
            hasValue && styles.value,
          )}
        >
          <input
            ref={this.textInput}
            type={type}
            id={inputId}
            placeholder={placeholder}
            className={styles.input}
            disabled={isDisabled}
            autoFocus={isAutoFocus}
            {...input}
            {...rest}
          />
          {hasLabel && (
            <label className={styles.label} htmlFor={inputId}>
              {label}
            </label>
          )}
        </div>
        {hasMessage && (
          <JFieldMessage
            message={errorMsg || infoMessage}
            theme={hasError ? 'error' : 'info'}
            className={styles.fieldMessage}
          />
        )}
      </div>
    )
  }
}
