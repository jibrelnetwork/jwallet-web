// @flow

import React from 'react'

import handle from 'utils/eventHandlers/handle'
import { JIcon, JText } from 'components/base'

const MnemonicPhrase = ({ copy, download, setHovered, mnemonic, hoveredItem }: Props) => (
  <div className='mnemonic-phrase'>
    <div className='mnemonic'>
      <JText
        value={mnemonic}
        color='blue'
        align='center'
        size='mnemonic'
        whiteSpace='wrap'
      />
    </div>
    <div className='overlay'>
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
          <JText value='Copy backup phrase' color={(hoveredItem === 'copy') ? 'sky' : 'blue'} />
        </div>
      </div>
      <div className='separator' />
      <div
        onClick={download}
        onMouseLeave={handle(setHovered)(null)}
        onMouseEnter={handle(setHovered)('load')}
        className='item'
      >
        <div className='icon'>
          <JIcon name='download' color={(hoveredItem === 'load') ? 'sky' : 'blue'} size='medium' />
        </div>
        <div className='text'>
          <JText value='Download as TXT' color={(hoveredItem === 'load') ? 'sky' : 'blue'} />
        </div>
      </div>
    </div>
  </div>
)

type Props = {
  copy: Function,
  download: Function,
  setHovered: Function,
  mnemonic: string,
  hoveredItem: null | 'copy' | 'load',
}

export default MnemonicPhrase
