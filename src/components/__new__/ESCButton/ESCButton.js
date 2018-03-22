// @flow

import React from 'react'

import { JText, JIcon } from 'components/base/__new__'

const ESCButton = ({ color, close }: Props) => (
  <div
    onClick={close}
    className={`esc-button -${color}`}
  >
    <div className='text'>
      <JText value='ESC' variants={['small', 'transparent', color]} />
    </div>
    <div className='icon'>
      <JIcon name={`close-popup-${color}`} size='medium' />
    </div>
  </div>
)

type Props = {
  color: 'white' | 'gray',
  close: Function,
}

export default ESCButton
