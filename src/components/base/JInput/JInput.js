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
  infoMessage,
  errorMessage,
  isLoading,
  isChecked,
  isDisabled,
  isMultiline,
}: Props) => {
  const labelOrPlaceholder = label || placeholder

  return (
    <div
      className={classNames(
        `j-input -${type} -${color}`,
        !!value && '-value',
        infoMessage && '-info',
        isLoading && '-loading',
        isChecked && '-checked',
        errorMessage && '-error',
        isDisabled && '-disabled',
      )}
    >
      {isMultiline ? (
        <textarea
          onChange={handleTargetValue(onChange)}
          className='textarea'
          rows={2}
          value={value}
          disabled={isDisabled}
          placeholder={i18n(placeholder) || placeholder}
        />
      ) : (
        <input
          onChange={handleTargetValue(onChange)}
          className='input'
          type={type}
          name={name}
          value={value}
          disabled={isDisabled}
          placeholder={i18n(placeholder) || placeholder}
        />
      )}
      <div className='label'>{i18n(labelOrPlaceholder) || labelOrPlaceholder}</div>
      {errorMessage && <div className='error'>{i18n(errorMessage) || errorMessage}</div>}
      {infoMessage && <div className='info'>{i18n(infoMessage) || infoMessage}</div>}
      <div className='tick' />
      <div className='loader' />
    </div>
  )
}

type Props = {
  onChange: Function,
  name: ?string,
  label: string,
  placeholder: string,
  infoMessage: ?string,
  errorMessage: ?string,
  value: string | number,
  color: 'gray' | 'white',
  type: 'text' | 'password',
  isLoading: boolean,
  isChecked: boolean,
  isDisabled: boolean,
  isMultiline: boolean,
}

JInput.defaultProps = {
  name: '',
  type: 'text',
  color: 'white',
  infoMessage: null,
  errorMessage: null,
  isLoading: false,
  isChecked: false,
  isDisabled: false,
  isMultiline: false,
}

export default JInput
