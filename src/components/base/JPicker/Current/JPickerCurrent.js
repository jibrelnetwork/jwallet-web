// @flow

import React from 'react'
import classNames from 'classnames'
import { camelCase } from 'lodash-es'

import pickerCurrentStyle from './jPickerCurrent.m.scss'

type Props = {|
  +value: string,
  +label: string,
  +isEditable: boolean,
  inputValue?: string,
  hasError?: boolean,
  onClick?: ?(() => any),
  onInputChange?: ?((e: SyntheticInputEvent<HTMLInputElement>) => any),
  iconRenderer?: ?(() => React$Node),
  balancesRenderer?: ?(() => React$Node),
|}

const JPickerCurrentComponent = (props: Props, ref: React$Ref<*>) => {
  const {
    value,
    inputValue,
    label,
    isEditable,
    hasError,
    onClick,
    onInputChange,
    iconRenderer,
    balancesRenderer,
  } = props

  const hasValue = !!value
  const id = camelCase(`${label}currentId`)

  return (
    <div
      className={classNames(
        pickerCurrentStyle.core,
        hasError && pickerCurrentStyle.error,
        isEditable && pickerCurrentStyle.editble,
        hasValue && pickerCurrentStyle.value,
        iconRenderer && pickerCurrentStyle.hasIcon,
      )}
      onClick={onClick}
    >
      <input
        ref={ref}
        id={id}
        type='text'
        className={pickerCurrentStyle.input}
        placeholder={value}
        value={inputValue}
        disabled={!isEditable}
        onChange={onInputChange}
        autoComplete='off'
      />
      <label className={pickerCurrentStyle.label} htmlFor={id}>
        {label}
      </label>
      {iconRenderer && (
        <div className={pickerCurrentStyle.icon}>
          {iconRenderer()}
        </div>
      )}
      {balancesRenderer && (
        <div className={pickerCurrentStyle.balances}>
          {balancesRenderer()}
        </div>
      )}
    </div>
  )
}

JPickerCurrentComponent.defaultProps = {
  value: '',
  lebel: '',
  isEditable: true,
  editable: false,
  hasError: false,
  onClick: null,
  inputValue: undefined,
  onInputChange: undefined,
  iconRenderer: undefined,
  balancesRenderer: undefined,
}

const JPickerCurrent = React.forwardRef/* :: <Props, HTMLInputElement> */(JPickerCurrentComponent)

export { JPickerCurrent }
