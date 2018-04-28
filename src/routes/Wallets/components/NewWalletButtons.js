// @flow

import React from 'react'

import WalletFace from './WalletFace'

const NewWalletButtons = ({ createWallet, importWallet }: Props) => (
  <div className='new-wallet-buttons'>
    <div className='separator' />
    <div className='button'>
      <WalletFace
        onClick={createWallet}
        iconName='key-new'
        title='Create new wallet'
        description='Some text about keys, mnemonic, address etc'
      />
    </div>
    <div className='button'>
      <WalletFace
        onClick={importWallet}
        iconName='key-import'
        title='Import wallet'
        description='Some text about keys, mnemonic, address etc'
      />
    </div>
  </div>
)

type Props = {
  createWallet: Function,
  importWallet: Function,
}

export default NewWalletButtons
