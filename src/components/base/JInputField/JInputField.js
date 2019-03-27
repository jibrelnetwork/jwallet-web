// @flow

import React from 'react'
import classNames from 'classnames'

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
  title: string,
  placeholder: string,
  infoMessage: string,
  input: FinalFormInput,
  meta: FinalFormMeta,
  isDisabled: boolean,
}

function getErrorMessage(meta: FinalFormMeta, validateType: ?JInputValidateType): ?string {
  const err = meta.error || meta.submitError

  const error = (typeof err === 'string')
    ? err
    : err instanceof Error && err.message
      ? err.message
      : ''

  if (validateType === 'dirtySinceLastSubmit' && !meta[validateType]) {
    return error
  } else if ((validateType === 'touched' || validateType === 'visited') && meta[validateType]) {
    return error
  }

  return undefined
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
  isDisabled,
}: Props) {
  console.log(meta)

  const errorMessage = getErrorMessage(meta, validateType)
  const hasTitle = !!title
  const hasError = !!errorMessage
  const hasInfo = !!infoMessage
  const hasValue = !!input.value
  const isActive = meta.active || !!input.value

  return (
    <div className={classNames(
      jInputFieldStyle.core,
      jInputFieldStyle[theme],
      hasError && jInputFieldStyle.error,
      isDisabled && jInputFieldStyle.disabled,
      hasValue && jInputFieldStyle.value,
      isActive && jInputFieldStyle.active,
    )}
    >
      <input
        type={type}
        className={jInputFieldStyle.input}
        placeholder={placeholder}
        {...input}
      />
      {hasTitle &&
        <div className={jInputFieldStyle.title}>{title}</div>}
      {!hasError && hasInfo &&
        <div className={jInputFieldStyle.info}>{infoMessage}</div>}
      {hasError &&
        <div className={jInputFieldStyle.error}>{errorMessage}</div>}
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
  isDisabled: false,
  isLoading: false,
}

export { JInputField }
