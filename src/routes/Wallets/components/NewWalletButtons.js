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
        iconName='add'
        title='Create new wallet'
        description='Create your own wallet to manage on-chain funds'
      />
    </div>
    <div className='button'>
      <WalletFace
        onClick={console.log}
        iconName='import'
        title='Import wallet'
        description='Import existing wallet to manage on-chain funds'
      />
    </div>
  </div>
)

export default NewWalletButtons
