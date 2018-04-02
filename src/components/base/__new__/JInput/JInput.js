/* @flow */

import React from 'react'
import cx from 'classnames'
import { identity } from 'ramda'

import { JIcon, JText } from '..'

const JInput = ({
  type,
  value,
  label,
  color,
  checked,
  disabled,
  onChange,
  multiline,
  isLoading,
  placeholder,
  infoMessage,
  errorMessage,
}: Props) => (
  <div className={cx(
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
        onChange={onChange && (event => onChange(event.target.value))}
        disabled={disabled}
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={event => (onChange ? onChange(event.target.value) : identity)}
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
  type?: 'text' | 'password',
  label?: string,
  color?: 'white' | 'gray' | 'red' | 'deep-orange' | 'orange' | 'lime' | 'light-green' | 'blue',
  value?: string | number,
  checked?: boolean,
  onChange?: Function,
  disabled?: boolean,
  multiline?: boolean,
  isLoading?: boolean,
  placeholder?: string,
  infoMessage?: string,
  errorMessage?: string,
}

JInput.defaultProps = {
  onChange: identity,
  type: 'text',
  color: 'white',
  label: undefined,
  value: undefined,
  checked: false,
  disabled: false,
  multiline: false,
  isLoading: false,
  placeholder: undefined,
  infoMessage: undefined,
  errorMessage: undefined,
}

export default JInput
