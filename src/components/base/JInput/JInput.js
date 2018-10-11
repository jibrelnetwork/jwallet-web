// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import handleTargetValue from 'utils/eventHandlers/handleTargetValue'

type Props = {
  onChange: ?((string) => void),
  name: ?string,
  label?: string,
  placeholder?: string,
  helpMessage: ?string,
  infoMessage: ?string,
  errorMessage: ?string,
  value: string | number,
  color: 'gray' | 'white',
  type: 'text' | 'password',
  isLoading: boolean,
  isDisabled: boolean,
  isPinCode: boolean,
  isMultiline: boolean,
  render?: Function
}

class JInput extends PureComponent<Props, *> {
  static defaultProps = {
    name: '',
    type: 'text',
    color: 'white',
    label: '',
    placeholder: null,
    rows: 4,
    onChange: null,
    helpMessage: null,
    infoMessage: null,
    errorMessage: null,
    isLoading: false,
    isDisabled: false,
    isPinCode: false,
    isMultiline: false,
    render: null,
  }

  render() {
    const {
      onChange,
      type,
      name,
      value,
      color,
      label,
      placeholder,
      helpMessage,
      infoMessage,
      errorMessage,
      isLoading,
      isDisabled,
      isPinCode,
      isMultiline,
      render,
    } = this.props

    const labelOrPlaceholder = label || placeholder
    const hasTopLabel = (color === 'gray') && labelOrPlaceholder
    const placeholderFromI18n =
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
          errorMessage && '-error',
          isDisabled && '-disabled',
          hasTopLabel && '-has-label',
          isPinCode && '-pincode',
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
