// @flow

import React from 'react'

import JInput, {
  type JInputType,
  type JInputColor,
} from './JInput'

type InputValidateType = 'touched' |
  'visited' |
  'dirtySinceLastSubmit'

type Props = {|
  +input: Object,
  +meta: Object,
  +label: string,
  type?: JInputType,
  +color: JInputColor,
  placeholder?: string,
  helpMessage?: string,
  infoMessage?: string,
  errorMessage?: string,
  validateType?: InputValidateType,
  isLoading?: boolean,
  isAutoFocus?: boolean,
  isPinCode?: boolean,
  isDisabled?: boolean,
  rows: ?number,
|}

function getErrorMessage(meta: Object, validateType: ?InputValidateType): ?string {
  const err = meta.error || meta.submitError

  const error = (typeof err === 'string')
    ? err
    : typeof err === 'object' && err.message && !err.isInfo
      ? err.message
      : ''

  if (validateType === 'dirtySinceLastSubmit' && !meta[validateType]) {
    return error
  } else if ((validateType === 'touched' || validateType === 'visited') && meta[validateType]) {
    return error
  }

  return undefined
}

function JInputField(props: Props) {
  const {
    input,
    meta,
    label,
    placeholder,
    color,
    type,
    validateType,
    helpMessage,
    infoMessage,
    errorMessage,
    isLoading,
    isAutoFocus,
    isDisabled,
    isPinCode,
    rows,
  } = props

  const {
    onBlur: handleBlur,
    onFocus: handleFocus,
    onChange: handleChange,
  } = input

  return (
    <JInput
      onBlur={handleBlur}
      onFocus={handleFocus}
      onChange={handleChange}
      name={input.name}
      label={label}
      value={input.value}
      placeholder={placeholder}
      helpMessage={helpMessage}
      errorMessage={errorMessage || getErrorMessage(meta, validateType)}
      infoMessage={infoMessage}
      color={color}
      type={type}
      isLoading={isLoading}
      isPinCode={isPinCode}
      isDisabled={isDisabled}
      isAutoFocus={isAutoFocus}
      rows={rows}
    />
  )
}

JInputField.defaultProps = {
  placeholder: undefined,
  type: 'text',
  validateType: 'dirtySinceLastSubmit',
  infoMessage: undefined,
  helpMessage: undefined,
  errorMessage: undefined,
  isLoading: false,
  isAutoFocus: false,
  isPinCode: false,
  isDisabled: false,
}

export default JInputField
