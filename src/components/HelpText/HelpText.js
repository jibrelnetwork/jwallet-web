// @flow

import React from 'react'
import { JIcon, JText } from 'react-components'

const HelpText = ({ text }: Props) => (
  <div className='help-text'>
    <div className='icon'>
      <JIcon name='info' color='white' size='medium' />
    </div>
    <div className='text'>
      <JText value={text} color='white' whiteSpace='wrap' />
    </div>
  </div>
)

type Props = {
  text: string,
}

export default HelpText
