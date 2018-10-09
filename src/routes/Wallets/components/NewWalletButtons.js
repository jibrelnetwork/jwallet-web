// @flow

import React from 'react'

import WalletFace from './WalletFace'

type Props = {|
  +createWallet: Function,
  // +importWallet: Function,
|}

const NewWalletButtons = ({ createWallet }: Props) => (
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
        onClick={console.log}
        iconName='key-import'
        title='Import wallet'
        description='Some text about keys, mnemonic, address etc'
      />
    </div>
  </div>
)

export default NewWalletButtons
