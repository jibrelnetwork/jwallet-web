/* @flow */

import React from 'react'
import cx from 'classnames'

import { JIcon, JText } from '..'

const JInput = ({
  type,
  value,
  label,
  color,
  disabled,
  onChange,
  isLoading,
  placeholder,
  errorMessage,
}: Props) => (
  <div className={cx(
    'j-input',
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
    {label && (
      <div className='label'>
        <JText
          value={label}
          variants={[
            color,
            'small',
            'uppercase',
            'transparent',
          ]}
        />
      </div>
    )}
    <div className='error-message'>
      <JText
        value={errorMessage}
        variants={['small', 'red']}
      />
    </div>
    {isLoading && (
      <div className='loader'>
        <JIcon name='loader' size='medium' />
      </div>
    )}
  </div>
)

type Props = {
  type?: 'text' | 'password',
  label: string,
  color: 'white' | 'gray',
  value?: string | number,
  onChange: Function,
  disabled?: boolean,
  isLoading?: boolean,
  placeholder?: string,
  errorMessage?: string,
}

JInput.defaultProps = {
  type: 'text',
  value: undefined,
  disabled: false,
  isLoading: false,
  placeholder: undefined,
  errorMessage: undefined,
}

export default JInput
