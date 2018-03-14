// @flow

import React from 'react'
import classNames from 'classnames'

const JText = ({ value, variant }: Props) => (
  <div className={classNames('j-text', `-${variant}`)}>
    {i18n(value) || value}
  </div>
)

type Props = {
  value: string,
  variant?: string,
}

JText.defaultProps = {
  variant: '',
}

export default JText
