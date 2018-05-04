// @flow

import React from 'react'
import { JInput } from 'react-components'

const SendOptionalItem = ({
  handler,
  name,
  value,
  placeholder,
  errorMessage,
}: Props) => (
  <div className='send-optional-item'>
    <JInput
      onChange={handler}
      name={name}
      value={value}
      placeholder={placeholder}
      errorMessage={errorMessage}
      type='text'
      color='gray'
    />
  </div>
)

type Props = {
  handler: Function,
  name: string,
  value: string,
  placeholder: string,
  errorMessage: ?string,
}

export default SendOptionalItem
