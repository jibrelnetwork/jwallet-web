// @flow

import React from 'react'

type PasswordFieldIndicatorColor = 'white' | 'gray'

type Props = {|
  +status: ?PasswordStatus,
  +color: PasswordFieldIndicatorColor,
|}

function PasswordFieldIndicator({
  color,
  status,
}: Props) {
  return !status ? null : (
    <div className={`password-field-indicator -on-${color}-field`}>
      <div className={`indicator -${status}`} />
    </div>
  )
}

export default PasswordFieldIndicator
