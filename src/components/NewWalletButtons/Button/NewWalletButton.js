// @flow

import React from 'react'

import { JText, JIcon } from 'components/base'

const NewWalletButton = ({ onClick, text, title, type }: Props) => (
  <div className='new-wallet-button' onClick={onClick}>
    <div className='icon'>
      <JIcon name={`key-${type}`} size='medium' />
    </div>
    <div className='data'>
      <div className='title'>
        <JText value={title} size='large' />
      </div>
      <div className='text'>
        <JText value={text} />
      </div>
    </div>
  </div>
)

type Props = {
  onClick: Function,
  text: string,
  title: string,
  type: string,
}

NewWalletButton.defaultProps = {
  onClick: () => {},
  text: '',
  title: '',
  type: 'new',
}

export default NewWalletButton
