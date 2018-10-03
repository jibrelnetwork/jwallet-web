// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import handleTargetValue from 'utils/eventHandlers/handleTargetValue'
import JStrengthBar from 'components/base/JStrengthBar'

function InputElement(props): React$Element<any> {
  const textareaProps = Object.assign({}, props)
  const inputProps = Object.assign({}, props)

  /* eslint fp/no-delete: 0 */
  delete textareaProps.type
  delete textareaProps.isMultiline
  delete inputProps.isMultiline

  return props.isMultiline ? <textarea {...textareaProps} /> : <input {...inputProps} />
}

type Props = {
  onChange: ?((string) => void),
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

class JInput extends PureComponent<Props, *> {
  static defaultProps = {
    name: '',
    type: 'text',
    color: 'white',
    label: '',
    rows: 4,
    onChange: null,
    helpMessage: null,
    infoMessage: null,
    errorMessage: null,
    passwordStrength: 0,
    isLoading: false,
    isChecked: false,
    isDisabled: false,
    isPinCode: false,
    isMultiline: false,
  }

  render() {
    const {
      onChange,
      type,
      name,
      value,
      color,
      rows,
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
      isMultiline,
    } = this.props

    const labelOrPlaceholder = label || placeholder
    const hasTopLabel = (color === 'gray') && labelOrPlaceholder

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
          onChange={onChange ? handleTargetValue(onChange) : undefined}
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
}

export default JInput
