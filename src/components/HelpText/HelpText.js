// @flow

import React from 'react'

import { JIcon, JText } from 'components/base'

const HelpText = ({ text }: Props) => (
  <div className='help-text'>
    <div className='icon'>
      <JIcon name='info' color='white' />
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
