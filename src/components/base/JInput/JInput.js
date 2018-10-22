// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import handleTargetValue from 'utils/eventHandlers/handleTargetValue'

type JInputValue = string | number
type JInputOnChangeHandler = (string) => void

type Props = {|
  +onChange: ?JInputOnChangeHandler,
  +name: ?string,
  +label: ?string,
  +value: ?JInputValue,
  +placeholder: ?string,
  +helpMessage: ?string,
  +infoMessage: ?string,
  +errorMessage: ?string,
  +color: 'gray' | 'white',
  +type: 'text' | 'password',
  +rows: ?number,
  +isLoading: boolean,
  +isPinCode: boolean,
  +isDisabled: boolean,
|}

type ChildrenProps = {|
  +onChange: ?Function,
  +name: ?string,
  +className: string,
  +value: ?JInputValue,
  +disabled: boolean,
  +placeholder: ?string,
|}

class JInput extends PureComponent<Props> {
  static defaultProps = {
    onChange: null,
    name: '',
    label: '',
    value: '',
    type: 'text',
    color: 'white',
    placeholder: '',
    helpMessage: null,
    infoMessage: null,
    errorMessage: null,
    rows: 0,
    isLoading: false,
    isPinCode: false,
    isDisabled: false,
  }

  render() {
    const {
      onChange,
      type,
      name,
      rows,
      color,
      label,
      value,
      placeholder,
      helpMessage,
      infoMessage,
      errorMessage,
      isLoading,
      isPinCode,
      isDisabled,
    } = this.props

    const isMultiline: boolean = !!rows
    const labelOrPlaceholder: ?string = label || placeholder
    const hasTopLabel: boolean = (color === 'gray') && !!labelOrPlaceholder

    const baseProps: ChildrenProps = {
      name,
      value,
      className: 'input',
      disabled: isDisabled,
      placeholder: labelOrPlaceholder,
      onChange: onChange ? handleTargetValue(onChange) : undefined,
    }

    const children = isMultiline
      ? <textarea {...baseProps} />
      : <input {...baseProps} type={type} />

    return (
      <div
        className={classNames(
          `j-input -${type} -${color}`,
          !!value && '-value',
          infoMessage && '-info',
          helpMessage && '-help',
          isLoading && '-loading',
          isPinCode && '-pincode',
          errorMessage && '-error',
          isDisabled && '-disabled',
          hasTopLabel && '-has-label',
          isMultiline && '-multiline',
        )}
      >
        {children}
        {hasTopLabel && <div className='label'>{labelOrPlaceholder}</div>}
        {infoMessage && <div className='info'>{infoMessage}</div>}
        {errorMessage && <div className='error'>{errorMessage}</div>}
        <div className='loader' />
        <div className='lock'><div className='icon' /></div>
        <div className='help'><div className='icon' /></div>
      </div>
    )
  }
}

export default JInput
