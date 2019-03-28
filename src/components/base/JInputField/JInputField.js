// @flow

import React from 'react'
import classNames from 'classnames'

import { getErrorMessage } from 'utils/form'
import { JFieldMessage } from 'components/base'

import jInputFieldStyle from './jInputField.m.scss'

export type JInputType = 'text' | 'password'
export type JInputTheme = 'white'

type Props = StyledComponent<JInputTheme> & {
  disabled: boolean,
  infoMessage: string,
  input: FinalFormInput,
  label: string,
  meta: FinalFormMeta,
  placeholder: string,
  type: JInputType,
  validateType: FinalFormValidateType,
}

function JInputField({
  className,
  theme,
  disabled,
  infoMessage,
  input,
  label,
  meta,
  placeholder,
  type,
  validateType,
  ...rest
}: Props) {
  const textInput = React.createRef()

  const errorMessage = getErrorMessage(meta, validateType)
  const hasLabel = !!label
  const hasPlaceholder = !!placeholder
  const hasError = !!errorMessage
  const hasInfo = !!infoMessage
  const hasValue = !!input.value
  const isActive = meta.active || hasValue || (hasLabel && hasPlaceholder)

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
          {...rest}
          {...input}
        />
        {hasLabel && (
          <div className={jInputFieldStyle.label}>
            {label}
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
  input: {},
  disabled: false,
}

export { JInputField }
