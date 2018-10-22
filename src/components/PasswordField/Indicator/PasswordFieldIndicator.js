// @flow

import React from 'react'

type Props = {|
  +status: ?PasswordStatus,
|}

function PasswordFieldIndicator({ status }: Props) {
  return !status ? null : (
    <div className='password-field-indicator'>
      <div className={`indicator -${status}`} />
    </div>
  )
}

export default PasswordFieldIndicator
