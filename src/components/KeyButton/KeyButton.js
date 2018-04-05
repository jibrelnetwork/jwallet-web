/* @flow */

import React from 'react'

import { JText, JIcon } from '../base'

const KeyButton = ({ icon, text, title, onClick }: Props) => (
  <div className='KeyButton' onClick={onClick}>
    <div className='info'>
      <div className='content'>
        <div className='icon'>
          <JIcon name={icon} size='medium' />
        </div>
        <div className='data'>
          <div className='title'>
            <JText
              value={title}
              variants={['white', 'large']}
            />
          </div>
          <div className='text'>
            <JText
              value={text}
              variants={['white', 'normal', 'transparent']}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)

type Props = {
  icon: string,
  text: string,
  title: string,
  onClick: () => void,
}

export default KeyButton
