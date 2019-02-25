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
  errorMessage?: string,
  isLoading?: boolean,
  isAutoFocus?: boolean,
  isPinCode?: boolean,
  isDisabled?: boolean,
  rows: ?number,
|}

JInputField.defaultProps = {
  placeholder: undefined,
  type: 'text',
  validateType: 'touched',
  errorMessage: undefined,
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
    errorMessage,
    isLoading,
    isAutoFocus,
    isDisabled,
    isPinCode,
    rows,
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
    errorMessage={errorMessage || (meta[validateType] && error ? error : undefined)}
    color={color}
    type={type}
    isLoading={isLoading}
    isPinCode={isPinCode}
    isDisabled={isDisabled}
    isAutoFocus={isAutoFocus}
    rows={rows}
  />)
}

export default JInputField
