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
  iconComponent?: ?React$Node,
  balancesComponent?: ?React$Node,
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
    iconComponent,
    balancesComponent,
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
        !!iconComponent && pickerCurrentStyle.hasIcon,
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
      {iconComponent && (
        <div className={pickerCurrentStyle.icon}>
          {iconComponent}
        </div>
      )}
      {balancesComponent && (
        <div className={pickerCurrentStyle.balances}>
          {balancesComponent}
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
  iconComponent: undefined,
  balancesComponent: undefined,
}

const JPickerCurrent = React.forwardRef/* :: <Props, HTMLInputElement> */(JPickerCurrentComponent)

export { JPickerCurrent }
