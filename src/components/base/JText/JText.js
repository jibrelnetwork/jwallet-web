import React from 'react'
import './JText.scss'

type Props = { value: string }

const JText = ({ value }: Props) => (
  <div className='Text'>
    {i18n(value)}
  </div>
)

export default JText
