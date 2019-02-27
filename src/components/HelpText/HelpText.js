// @flow

import React from 'react'

import {
  JIcon,
  JText,
} from 'components/base'

type Props = {|
  +text: string,
|}

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

export default HelpText
