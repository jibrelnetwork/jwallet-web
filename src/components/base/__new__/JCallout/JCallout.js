import React from 'react'
import { pure } from 'recompose'

import JText from '../JText'
import './JCallout.scss'

type Props = {
  text: string,
}

const JCallout = ({ text }: Props) => (
  <div className='JCallout' >
    <JText value={text} />
  </div>
)

export default pure(JCallout)
