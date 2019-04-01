// @flow

import React from 'react'
import classNames from 'classnames'
import { camelCase } from 'lodash-es'

import { getErrorMessage } from 'utils/form'
import { JFieldMessage } from 'components/base'

import jInputFieldStyle from './jInputField.m.scss'

export type JInputType = 'text' | 'password'
export type JInputTheme = 'white'

type Props = StyleComponent<JInputTheme> & {
  disabled: boolean,
  infoMessage: string,
  id: ?string,
  input: FinalFormInput,
  label: string,
  meta: FinalFormMeta,
  placeholder: string,
  type: JInputType,
  validateType: FinalFormValidateType,
}

type InputRef = {
  current: null | HTMLInputElement,
}

const handleFocus = (ref: InputRef) => () => ref.current && ref.current.focus()

function JInputField({
  disabled,
  infoMessage,
  id,
  input,
  label,
  meta,
  placeholder,
  type,
  validateType,
  theme,
  className,
  ...rest
}: Props) {
  const textInput: { current: null | HTMLInputElement} = React.createRef()

  const errorMessage = getErrorMessage(meta, validateType)
  const hasLabel = !!label
  const hasPlaceholder = !!placeholder
  const hasError = !!errorMessage
  const hasInfo = !!infoMessage
  const hasValue = !!input.value
  const isActive = meta.active || hasValue || (hasLabel && hasPlaceholder)
  const inputId = id || `${camelCase(input.name || label || placeholder || 'noname')}Id`

  const hasMessage = (hasError || hasInfo)
  const messageTheme = hasError
    ? 'error'
    : 'info'

  return (
    <div
      className={classNames(
        jInputFieldStyle.core,
        '__jinputfield',
        jInputFieldStyle[theme],
        className,
      )}
      onClick={handleFocus(textInput)}
    >
      <div className={classNames(
        jInputFieldStyle.wrap,
        hasMessage && jInputFieldStyle.message,
        hasError && jInputFieldStyle.error,
        disabled && jInputFieldStyle.disabled,
        hasValue && jInputFieldStyle.value,
        isActive && jInputFieldStyle.active,
      )}
      >
        <input
          ref={textInput}
          id={inputId}
          type={type}
          className={jInputFieldStyle.input}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
          {...input}
        />
        {hasLabel && (
          <label className={jInputFieldStyle.label} htmlFor={inputId}>
            {label}
          </label>
        )}
      </div>
      {hasMessage && (
        <JFieldMessage
          theme={messageTheme}
          message={errorMessage || infoMessage}
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
  id: undefined,
  infoMessage: '',
  label: '',
  placeholder: '',
  meta: {},
  input: {},
  disabled: false,
}

export { JInputField }
