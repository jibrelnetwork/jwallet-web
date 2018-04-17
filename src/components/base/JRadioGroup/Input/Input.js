// @flow

import React from 'react'
import classNames from 'classnames'

import { JIcon, JText } from 'components/base'

const Input = ({
  onCheck,
  onChange,
  value,
  placeholder,
  errorMessage,
  checked,
  withError,
}: Props) => (
  <div
    onClick={onCheck}
    className={classNames('Input', { '-checked': checked, '-with-error': withError })}
  >
    <div className='content'>
      <div className='icon'>
        {checked && <JIcon name='checkbox-blue' size='small' />}
      </div>
      <div className='input'>
        <input value={value} onChange={onChange} placeholder={placeholder} />
      </div>
    </div>
    {withError && (
      <div className='error-message'>
        <JText value={errorMessage} size='small' color='red' />
      </div>
    )}
  </div>
)

type Props = {
  onCheck: Function,
  onChange: Function,
  value: string,
  placeholder: string,
  errorMessage: string,
  checked: boolean,
  withError: boolean,
}

Input.defaultProps = {
  checked: false,
  withError: undefined,
  errorMessage: undefined,
}

export default Input
