// @flow

import React from 'react'

import WalletFace from 'components/WalletFace'

type Props = {|
  +createWallet: () => void,
  +importWallet: () => void,
|}

const NewWalletButtons = ({
  createWallet,
  importWallet,
}: Props) => (
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
        onClick={importWallet}
        iconName='import'
        title='Import wallet'
        description='Import existing wallet to manage on-chain funds'
      />
    </div>
  </div>
)

export default NewWalletButtons
