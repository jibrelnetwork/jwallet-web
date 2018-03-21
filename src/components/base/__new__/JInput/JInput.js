/* @flow */

import React from 'react'
import cx from 'classnames'

import { JIcon, JText } from '..'

const JInput = ({
  type,
  value,
  label,
  color,
  checked,
  disabled,
  onChange,
  isLoading,
  placeholder,
  infoMessage,
  errorMessage,
}: Props) => (
  <div className={cx(
    'j-input',
    `-${type}`,
    `-${color}`,
    disabled && '-disabled',
    errorMessage && '-with-error',
  )}
  >
    <input
      type={type}
      value={value}
      disabled={disabled}
      onChange={event => onChange(event.target.value)}
      placeholder={placeholder}
    />
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
          variants={['normal', color, 'transparent']}
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
  color?: 'white' | 'gray',
  value?: string | number,
  checked?: boolean,
  onChange: Function,
  disabled?: boolean,
  isLoading?: boolean,
  placeholder?: string,
  infoMessage?: string,
  errorMessage?: string,
}

JInput.defaultProps = {
  type: 'text',
  color: 'white',
  label: undefined,
  value: undefined,
  checked: false,
  disabled: false,
  isLoading: false,
  placeholder: undefined,
  infoMessage: undefined,
  errorMessage: undefined,
}

export default JInput
