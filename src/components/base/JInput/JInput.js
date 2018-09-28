// @flow

import React from 'react'
import classNames from 'classnames'

import handleTargetValue from 'utils/eventHandlers/handleTargetValue'
import JStrengthBar from 'components/base/JStrengthBar'

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
  passwordStrength,
  isLoading,
  isChecked,
  isDisabled,
  isPinCode,
}: Props) => {
  const labelOrPlaceholder = label || placeholder
  const hasTopLabel = color === 'gray' && labelOrPlaceholder

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
        hasTopLabel && '-has-label',
        !!passwordStrength && '-has-status-bar',
        isPinCode && '-pincode',
      )}
    >
      <input
        onChange={handleTargetValue(onChange)}
        className='input'
        type={type}
        name={name}
        value={value}
        disabled={isDisabled}
        placeholder={placeholder && i18n(placeholder)}
      />

      {passwordStrength && <JStrengthBar strength={passwordStrength} className='status' />}
      {hasTopLabel && <div className='label'>{i18n(labelOrPlaceholder) || labelOrPlaceholder}</div>}
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
  passwordStrength: strengthBarLevels,
  value: string | number,
  color: 'gray' | 'white',
  type: 'text' | 'password',
  isLoading: boolean,
  isChecked: boolean,
  isDisabled: boolean,
  isPinCode: boolean,
}

JInput.defaultProps = {
  name: '',
  type: 'text',
  color: 'white',
  helpMessage: null,
  infoMessage: null,
  errorMessage: null,
  passwordStatus: null,
  isLoading: false,
  isChecked: false,
  isDisabled: false,
  isPinCode: false,
}

export default JInput
