// @flow

import React from 'react'

import KeyButton from 'components/__new__/KeyButton'

const NewWalletButtons = ({ createWallet, importWallet }: Props) => (
  <div className='new-wallet-buttons'>
    <div className='separator' />
    <div className='button'>
      <KeyButton
        onClick={createWallet}
        icon='key-new'
        text='Some text about keys, mnemonic, address etc'
        title='Create new wallet'
      />
    </div>
    <div className='button'>
      <KeyButton
        onClick={importWallet}
        icon='key-import'
        text='Some text about keys, mnemonic, address etc'
        title='Import wallet'
      />
    </div>
  </div>
)

type Props = {
  createWallet: Function,
  importWallet: Function,
}

export default NewWalletButtons
