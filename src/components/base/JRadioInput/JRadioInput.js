/* @flow */

import cx from 'classnames'
import React from 'react'

import { JIcon, JText } from '../.'

const JRadioInput = ({
  value,
  checked,
  onCheck,
  onChange,
  placeholder,
  errorMessage,
}: Props) => (
  <div
    onClick={onCheck}
    className={cx('JRadioInput', {
      '-checked': checked,
      '-with-error': Boolean(errorMessage),
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
          onChange={event => onChange(event.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
    {Boolean(errorMessage) && (
      <div className='error-message'>
        <JText
          value={errorMessage}
          variants={['small', 'red']}
        />
      </div>
    )}
  </div>
)

type Props = {
  value: string,
  checked?: boolean,
  placeholder: string,
  errorMessage?: string,
  onCheck: Function,
  onChange: Function,
}

JRadioInput.defaultProps = {
  checked: false,
  errorMessage: undefined,
}

export default JRadioInput
