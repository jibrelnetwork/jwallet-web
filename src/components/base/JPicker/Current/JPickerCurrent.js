// @flow strict

import React from 'react'
import classNames from 'classnames'

import styles from './jPickerCurrent.m.scss'

type OwnProps = {|
  +onClick?: ?(() => any),
  +onInputChange?: ?((e: SyntheticInputEvent<HTMLInputElement>) => any),
  +iconComponent?: ?React$Node,
  +balancesComponent?: ?React$Node,
  +label: string,
  +value: string,
  +inputValue?: string,
  +hasError?: boolean,
  +isEditable: boolean,
|}

type Props = {|
  ...OwnProps,
  +inputRef: React$Ref<*>,
|}

function JPickerCurrentView({
  onClick,
  onInputChange,
  inputRef,
  iconComponent,
  balancesComponent,
  label,
  value,
  inputValue,
  isEditable,
  hasError,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        styles.core,
        hasError && styles.error,
        isEditable && styles.editble,
        !!value && styles.value,
        !!iconComponent && styles.hasIcon,
      )}
    >
      <input
        onChange={onInputChange}
        ref={inputRef}
        value={inputValue}
        placeholder={value}
        className={styles.input}
        type='text'
        autoComplete='off'
        maxLength={256}
        disabled={!isEditable}
      />
      <span className={styles.label}>
        {label}
      </span>
      {iconComponent && (
        <div className={styles.icon}>
          {iconComponent}
        </div>
      )}
      {balancesComponent && (
        <div className={styles.balances}>
          {balancesComponent}
        </div>
      )}
    </div>
  )
}

JPickerCurrentView.defaultProps = {
  onClick: null,
  onInputChange: undefined,
  iconComponent: undefined,
  balancesComponent: undefined,
  value: '',
  label: '',
  inputValue: undefined,
  hasError: false,
  isEditable: true,
}

// eslint-disable-next-line react/display-name
export const JPickerCurrent = React.forwardRef/* :: <OwnProps, HTMLInputElement> */((
  props: OwnProps,
  ref: React$Ref<*>,
) => <JPickerCurrentView {...props} inputRef={ref} />)
