// @flow

import React from 'react'
import classNames from 'classnames'

import { getErrorMessage } from 'utils/form'
import { JFieldMessage } from 'components/base'

import jInputFieldStyle from './jInputField.m.scss'

export type JInputType = 'text' | 'password'
export type JInputTheme = 'white'
export type JInputValidateType =
  'touched' |
  'visited' |
  'dirtySinceLastSubmit'

type Props = {
  type: JInputType,
  theme: JInputTheme,
  validateType: JInputValidateType,
  className: string,
  placeholder: string,
  title: string,
  infoMessage: string,
  input: FinalFormInput,
  meta: FinalFormMeta,
  disabled: boolean,
}

function JInputField({
  type,
  theme,
  validateType,
  infoMessage,
  title,
  placeholder,
  input,
  meta,
  disabled,
  className,
  ...rest
}: Props) {
  const textInput = React.createRef()

  const errorMessage = getErrorMessage(meta, validateType)
  const hasTitle = !!title
  const hasPlaceholder = !!placeholder
  const hasError = !!errorMessage
  const hasInfo = !!infoMessage
  const hasValue = !!input.value
  const isActive = meta.active || hasValue || (hasTitle && hasPlaceholder)

  return (
    <div
      className={classNames(
        jInputFieldStyle.core,
        jInputFieldStyle[theme],
        className,
      )}
      onClick={() => textInput.current.focus()}
    >
      <div className={classNames(
        jInputFieldStyle.wrap,
        (hasError || hasInfo) && jInputFieldStyle.message,
        hasError && jInputFieldStyle.error,
        disabled && jInputFieldStyle.disabled,
        hasValue && jInputFieldStyle.value,
        isActive && jInputFieldStyle.active,
      )}
      >
        <input
          ref={textInput}
          type={type}
          className={jInputFieldStyle.input}
          placeholder={placeholder}
          disabled={disabled}
          {...input}
          {...rest}
        />
        {hasTitle && (
          <div className={jInputFieldStyle.title}>
            {title}
          </div>
        )}
      </div>
      {!hasError && hasInfo && (
        <JFieldMessage
          theme='info'
          message={infoMessage}
          className={jInputFieldStyle.fieldMessage}
        />
      )}
      {hasError && errorMessage && (
        <JFieldMessage
          theme='error'
          message={errorMessage}
          className={jInputFieldStyle.fieldMessage}
        />
      )}
    </div>
  )
}

JInputField.defaultProps = {
  type: 'text',
  theme: 'white',
  validateType: 'touched',
  infoMessage: '',
  label: '',
  placeholder: '',
  meta: {},
  disabled: false,
}

export { JInputField }
