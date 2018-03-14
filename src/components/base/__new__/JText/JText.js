import React from 'react'
import classNames from 'classnames'
import { pure } from 'recompose'

import './JText.scss'

type Props = {
  value: string,
  variant?: string,
}

const JText = ({ value, variant }: Props) => (
  <div className={classNames('JText', `-${variant}`)}>
    {i18n(value) || value}
  </div>
)

JText.defaultProps = {
  variant: undefined,
}

export default pure(JText)
