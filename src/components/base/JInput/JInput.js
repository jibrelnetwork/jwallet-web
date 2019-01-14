// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import JIcon from 'components/base/JIcon'

import handleTargetValue from 'utils/eventHandlers/handleTargetValue'

type JInputValue = string | number
type JInputOnChangeHandler = (string) => void
export type JInputColor = 'gray' | 'white'
export type JInputType = 'text' | 'password'

type Props = {|
  +onChange: ?JInputOnChangeHandler,
  onFocus?: Function,
  onBlur?: Function,
  +name: ?string,
  +label: ?string,
  +value: ?JInputValue,
  +placeholder: ?string,
  +helpMessage: ?string,
  +infoMessage: ?string,
  +errorMessage: ?string,
  +color: JInputColor,
  +type: JInputType,
  +sideBorderRadius: 'all' | 'top' | 'left' | 'bottom' | 'right',
  +rows: ?number,
  +isLoading: boolean,
  +isPinCode: boolean,
  +isDisabled: boolean,
  +isAutoFocus: boolean,
  +isVirtualHalfSize: boolean,
|}

type ChildrenProps = {|
  +onChange: ?Function,
  onBlur?: Function,
  onFocus?: Function,
  +name: ?string,
  +className: string,
  +value: ?JInputValue,
  +placeholder: ?string,
  +disabled: boolean,
  +autoFocus: boolean,
|}

const noop = () => {}

class JInput extends PureComponent<Props> {
  static defaultProps = {
    onChange: null,
    onFocus: noop,
    onBlur: noop,
    name: '',
    label: '',
    value: '',
    type: 'text',
    sideBorderRadius: 'all',
    color: 'white',
    placeholder: '',
    helpMessage: null,
    infoMessage: null,
    errorMessage: null,
    rows: 0,
    isLoading: false,
    isPinCode: false,
    isDisabled: false,
    isAutoFocus: false,
    isVirtualHalfSize: false,
  }

  render() {
    const {
      onChange,
      onBlur,
      onFocus,
      type,
      name,
      rows,
      color,
      label,
      value,
      sideBorderRadius,
      placeholder,
      helpMessage,
      infoMessage,
      errorMessage,
      isLoading,
      isPinCode,
      isDisabled,
      isAutoFocus,
      isVirtualHalfSize,
    } = this.props

    const isMultiline: boolean = !!rows
    const labelOrPlaceholder: ?string = label || placeholder
    const hasTopLabel: boolean = (color === 'gray') && !!labelOrPlaceholder

    const baseProps: ChildrenProps = {
      name,
      value,
      className: `input -side-border-radius-${sideBorderRadius}`,
      disabled: isDisabled,
      autoFocus: isAutoFocus,
      placeholder: labelOrPlaceholder,
      onChange: onChange ? handleTargetValue(onChange) : undefined,
      onBlur,
      onFocus,
    }

    const children = isMultiline
      ? <textarea {...baseProps} rows={rows} />
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
          isVirtualHalfSize && '-virtual-half-size'
        )}
      >
        {children}
        {hasTopLabel && <div className='label'>{labelOrPlaceholder}</div>}
        {infoMessage && <div className='info'>{infoMessage}</div>}
        {errorMessage && <div className='error'>{errorMessage}</div>}
        <div className='loader' />
        <div className='help'><div className='icon' /></div>
        {isDisabled && (
          <div className='lock'>
            <JIcon
              size='medium'
              color={color}
              name='padding-lock'
            />
          </div>
        )}
      </div>
    )
  }
}

export default JInput
