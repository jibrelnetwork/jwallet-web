// @flow

import React from 'react'

import { JText, JIcon } from 'components/base/__new__'

const ESCButton = () => (
  <div className='esc-button'>
    <div className='text'>
      <JText value='esc' variants={['normal', 'transparent', 'white']} />
    </div>
    <div className='icon'>
      <JIcon name='close-popup-white' size='medium' />
    </div>
  </div>
)

export default ESCButton
