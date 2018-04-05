/* @flow */

import cx from 'classnames'
import React from 'react'

import { JIcon, JText } from '../..'

type Props = {
  value: string,
  checked?: boolean,
  withError?: boolean,
  placeholder: string,
  errorMessage?: string,
  onCheck: Function,
  onChange: Function,
}

const Input = ({
  value,
  checked,
  onCheck,
  onChange,
  withError,
  placeholder,
  errorMessage,
}: Props) => (
  <div
    onClick={onCheck}
    className={cx('Input', {
      '-checked': checked,
      '-with-error': withError,
    })}
  >
    <div className='content'>
      <div className='icon'>
        {checked && (
          <JIcon
            name='checkbox-blue'
            size='small'
          />
        )}
      </div>
      <div className='input'>
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
    {withError && (
      <div className='error-message'>
        <JText
          value={errorMessage}
          variants={['small', 'red']}
        />
      </div>
    )}
  </div>
)

Input.defaultProps = {
  checked: false,
  withError: undefined,
  errorMessage: undefined,
}

export default Input
