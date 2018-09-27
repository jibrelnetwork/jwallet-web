// @flow

import React from 'react'
import classNames from 'classnames'

import handleTargetValue from 'utils/eventHandlers/handleTargetValue'

const JInput = ({
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
  isChecked,
  isDisabled,
  hasLabel,
}: Props) => {
  const labelOrPlaceholder = label || placeholder

  return (
    <div
      className={classNames(
        `j-input -${type} -${color}`,
        !!value && '-value',
        infoMessage && '-info',
        helpMessage && '-help',
        isLoading && '-loading',
        isChecked && '-checked',
        errorMessage && '-error',
        isDisabled && '-disabled',
        hasLabel && '-has-label',
      )}
    >
      <input
        onChange={handleTargetValue(onChange)}
        className='input'
        type={type}
        name={name}
        value={value}
        disabled={isDisabled}
        placeholder={i18n(placeholder) || placeholder}
      />
      {hasLabel && <div className='label'>{i18n(labelOrPlaceholder) || labelOrPlaceholder}</div>}
      {infoMessage && <div className='info'>{i18n(infoMessage) || infoMessage}</div>}
      {errorMessage && <div className='error'>{i18n(errorMessage) || errorMessage}</div>}
      <div className='tick' />
      <div className='loader' />
      <div className='lock'><div className='icon' /></div>
      <div className='help'><div className='icon' /></div>
    </div>
  )
}

type Props = {
  onChange: Function,
  name: ?string,
  label: string,
  placeholder: string,
  helpMessage: ?string,
  infoMessage: ?string,
  errorMessage: ?string,
  value: string | number,
  color: 'gray' | 'white',
  type: 'text' | 'password',
  isLoading: boolean,
  isChecked: boolean,
  isDisabled: boolean,
  hasLabel: boolean,
}

JInput.defaultProps = {
  name: '',
  type: 'text',
  color: 'white',
  helpMessage: null,
  infoMessage: null,
  errorMessage: null,
  isLoading: false,
  isChecked: false,
  isDisabled: false,
  hasLabel: false,
}

export default JInput
