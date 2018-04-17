// @flow

import React from 'react'

import NewWalletButton from './Button'

const NewWalletButtons = ({ createWallet, importWallet }: Props) => (
  <div className='new-wallet-buttons'>
    <div className='separator' />
    <div className='button'>
      <NewWalletButton
        onClick={createWallet}
        type='new'
        title='Create new wallet'
        text='Some text about keys, mnemonic, address etc'
      />
    </div>
    <div className='button'>
      <NewWalletButton
        onClick={importWallet}
        type='import'
        title='Import wallet'
        text='Some text about keys, mnemonic, address etc'
      />
    </div>
  </div>
)

type Props = {
  createWallet: Function,
  importWallet: Function,
}

NewWalletButtons.defaultProps = {
  createWallet: () => {},
  importWallet: () => {},
}

export default NewWalletButtons
