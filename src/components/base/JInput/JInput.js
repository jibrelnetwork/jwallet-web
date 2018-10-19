// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import handleTargetValue from 'utils/eventHandlers/handleTargetValue'

type Props = {|
  +render: ?Function,
  +onChange: ?((string) => void),
  +name: ?string,
  +label: ?string,
  +placeholder: ?string,
  +helpMessage: ?string,
  +infoMessage: ?string,
  +errorMessage: ?string,
  +color: 'gray' | 'white',
  +type: 'text' | 'password',
  +value: null | number | string,
  +rows: ?number,
  +isLoading: boolean,
  +isPinCode: boolean,
  +isDisabled: boolean,
  +isMultiline: boolean,
|}

class JInput extends PureComponent<Props> {
  static defaultProps = {
    render: null,
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
    rows: 4,
    isLoading: false,
    isPinCode: false,
    isDisabled: false,
    isMultiline: false,
  }

  render() {
    const {
      render,
      onChange,
      type,
      name,
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
      isMultiline,
    } = this.props

    const labelOrPlaceholder: ?string = label || placeholder
    const hasTopLabel: boolean = (color === 'gray') && !!labelOrPlaceholder

    const placeholderFromI18n: ?string =
      (labelOrPlaceholder && i18n(labelOrPlaceholder)) || labelOrPlaceholder

    const controlledProps = {
      onChange: onChange ? handleTargetValue(onChange) : undefined,
      className: 'input',
      type,
      name,
      value,
      disabled: isDisabled,
      placeholder: placeholderFromI18n,
    }

    const input = (<input {...controlledProps} />)

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
        {(render && render(controlledProps)) || input}
        {hasTopLabel && <div className='label'>{placeholderFromI18n}</div>}
        {infoMessage && <div className='info'>{i18n(infoMessage) || infoMessage}</div>}
        {errorMessage && <div className='error'>{i18n(errorMessage) || errorMessage}</div>}
        <div className='loader' />
        <div className='lock'><div className='icon' /></div>
        <div className='help'><div className='icon' /></div>
      </div>
    )
  }
}

export default JInput
