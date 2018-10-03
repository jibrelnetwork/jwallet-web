// @flow

import React from 'react'

const JStrengthBar = ({ strength, className }: Props) => (
  <div className={`j-strength-bar -level-${strength} ${className}`} />
)

type Props = {
  strength: StrengthBarLevels,
  className: string,
}

export default JStrengthBar
