import React from 'react'
import classNames from 'classnames'
import { pure } from 'recompose'

import './JText.scss'

type Props = {
  value: string,
  variants?: array,
}

const JText = ({ value, variants }: Props) => (
  <div
    className={classNames(
      'JText',
      variants.map(variant => `-${variant}`).join(' ')
    )}
  >
    {i18n(value) || value}
  </div>
)

JText.defaultProps = {
  variants: [],
}

export default pure(JText)
