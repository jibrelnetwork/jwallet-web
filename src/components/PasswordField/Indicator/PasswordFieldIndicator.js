// @flow

import React from 'react'

function PasswordFieldIndicator({ status }: Props) {
  return !status ? null : (
    <div className='password-field-indicator'>
      <div className={`indicator -${status}`} />
    </div>
  )
}

type Props = {
  status: string,
}

export default PasswordFieldIndicator
