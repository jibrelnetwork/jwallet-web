import React from 'react'
import { pure } from 'recompose'

import './JText.scss'

type Props = { value: string }

const JText = ({ value }: Props) => (
  <div className='JText'>
    {i18n(value) || value}
  </div>
)

export default pure(JText)
