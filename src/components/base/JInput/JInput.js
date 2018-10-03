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
  rows,
  placeholder,
  helpMessage,
  infoMessage,
  errorMessage,
  passwordStrength,
  isLoading,
  isChecked,
  isDisabled,
  isPinCode,
  isMultiline,
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
        isPinCode && '-pincode',
        isMultiline && '-multiline',
      )}
    >
      <InputElement
        onChange={handleTargetValue(onChange)}
        className='input'
        type={type}
        name={name}
        value={value}
        disabled={isDisabled}
        placeholder={i18n(labelOrPlaceholder) || labelOrPlaceholder}
        isMultiline={isMultiline}
        rows={rows}
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
  passwordStrength: StrengthBarLevels,
  value: string | number,
  color: 'gray' | 'white',
  type: 'text' | 'password',
  rows: number,
  isLoading: boolean,
  isChecked: boolean,
  isDisabled: boolean,
  isPinCode: boolean,
  isMultiline: boolean,
}

JInput.defaultProps = {
  name: null,
  type: 'text',
  rows: 4,
  color: 'white',
  helpMessage: null,
  infoMessage: null,
  errorMessage: null,
  passwordStatus: null,
  isLoading: false,
  isChecked: false,
  isDisabled: false,
  isPinCode: false,
  isMultiline: false,
}

function InputElement(props): React$Element<any> {
  const textareaProps = Object.assign({}, props)
  const inputProps = Object.assign({}, props)

  /* eslint fp/no-delete: 0 */
  delete textareaProps.type
  delete textareaProps.isMultiline
  delete inputProps.isMultiline

  return props.isMultiline ? <textarea {...textareaProps} /> : <input {...inputProps} />
}


export default JInput
