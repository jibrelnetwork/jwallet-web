// @flow

import React from 'react'
import classNames from 'classnames'
import { identity } from 'ramda'

import handleTargetValue from 'utils/eventHandlers/handleTargetValue'
import { JIcon, JText } from 'components/base'

const JInput = ({
  onChange,
  label,
  placeholder,
  infoMessage,
  errorMessage,
  value,
  color,
  type,
  checked,
  disabled,
  multiline,
  isLoading,
}: Props) => (
  <div className={classNames(
    'j-input',
    type && `-${type}`,
    color && `-${color}`,
    disabled && '-disabled',
    errorMessage && '-with-error',
  )}
  >
    {multiline ? (
      <textarea
        rows={2}
        value={value}
        onChange={handleTargetValue(onChange)}
        disabled={disabled}
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={handleTargetValue(onChange)}
        placeholder={placeholder}
      />
    )}
    <div className='label'>
      <JText
        value={label || placeholder}
        variants={[
          color,
          'small',
          'uppercase',
          'transparent',
        ]}
      />
    </div>
    {errorMessage && (
      <div className='error-message'>
        <JText
          value={errorMessage}
          variants={['small', 'red']}
        />
      </div>
    )}
    {infoMessage && (
      <div className='info-message'>
        <JText
          value={infoMessage}
          variants={[color, 'normal', 'transparent']}
        />
      </div>
    )}
    {isLoading && (
      <div className='loader'>
        <JIcon name='loader' size='medium' />
      </div>
    )}
    {checked && (
      <div className='check-mark'>
        <JIcon name='checkbox-white' size='small' />
      </div>
    )}
  </div>
)

type Props = {
  onChange: Function,
  label: string,
  placeholder: string,
  infoMessage: string,
  errorMessage: string,
  value: string | number,
  color: 'white' | 'gray',
  type: 'text' | 'password',
  checked: boolean,
  disabled: boolean,
  multiline: boolean,
  isLoading: boolean,
}

JInput.defaultProps = {
  onChange: identity,
  type: 'text',
  color: 'white',
  checked: false,
  disabled: false,
  multiline: false,
  isLoading: false,
  label: undefined,
  value: undefined,
  placeholder: undefined,
  infoMessage: undefined,
  errorMessage: undefined,
}

export default JInput
