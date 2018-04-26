// @flow

import React from 'react'

import handle from 'utils/eventHandlers/handle'
import { JIcon, JText } from 'components/base'

const OverlayActions = ({ copy, load, setHovered, copyLabel, loadLabel, hoveredItem }: Props) => (
  <div className='overlay-actions'>
    <div
      onClick={copy}
      onMouseLeave={handle(setHovered)(null)}
      onMouseEnter={handle(setHovered)('copy')}
      className='item'
    >
      <div className='icon'>
        <JIcon name='copy' color={(hoveredItem === 'copy') ? 'sky' : 'blue'} size='medium' />
      </div>
      <div className='text'>
        <JText value={copyLabel} color={(hoveredItem === 'copy') ? 'sky' : 'blue'} weight='bold' />
      </div>
    </div>
    <div className='separator'>
      <div className='line' />
    </div>
    <div
      onClick={load}
      onMouseLeave={handle(setHovered)(null)}
      onMouseEnter={handle(setHovered)('load')}
      className='item'
    >
      <div className='icon'>
        <JIcon name='download' color={(hoveredItem === 'load') ? 'sky' : 'blue'} size='medium' />
      </div>
      <div className='text'>
        <JText value={loadLabel} color={(hoveredItem === 'load') ? 'sky' : 'blue'} weight='bold' />
      </div>
    </div>
  </div>
)

type Props = {
  copy: Function,
  load: Function,
  setHovered: Function,
  copyLabel: string,
  loadLabel: string,
  hoveredItem: null | 'copy' | 'load',
}

export default OverlayActions
