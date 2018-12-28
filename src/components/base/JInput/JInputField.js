// @flow

import React from 'react'
import JInput, { type JInputColor, type JInputType } from './JInput'

type Props = {|
  +input: Object,
  +meta: Object,
  +label: string,
  +color: JInputColor,
  validateType?: 'touched' | 'visited',
  placeholder?: string,
  type?: JInputType,
  helpMessage?: string,
  isLoading?: boolean,
  isAutoFocus?: boolean,
  isPinCode?: boolean,
  isDisabled?: boolean,
|}

JInputField.defaultProps = {
  placeholder: undefined,
  type: 'text',
  validateType: 'touched',
  helpMessage: undefined,
  isLoading: false,
  isAutoFocus: false,
  isPinCode: false,
  isDisabled: false,
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
    isLoading,
    isAutoFocus,
    isDisabled,
    isPinCode,
  } = props

  const { error } = meta

  return (<JInput
    onChange={input.onChange}
    onFocus={input.onFocus}
    onBlur={input.onBlur}
    name={input.name}
    label={label}
    value={input.value}
    placeholder={placeholder}
    helpMessage={helpMessage}
    errorMessage={meta[validateType] && error ? error : undefined}
    color={color}
    type={type}
    isLoading={isLoading}
    isPinCode={isPinCode}
    isDisabled={isDisabled}
    isAutoFocus={isAutoFocus}
  />)
}

export default JInputField
