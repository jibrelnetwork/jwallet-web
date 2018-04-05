// TODO: move JICon with rounded border to separate component

// @flow

import React from 'react'

import { JText, JIcon } from 'components/base'

const ESCButton = ({ color, onClick }: Props) => (
  <div
    onClick={onClick}
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
  onClick: Function,
}

export default ESCButton
