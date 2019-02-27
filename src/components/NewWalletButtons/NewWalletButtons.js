// @flow

import React from 'react'
import { t } from 'ttag'

import WalletFace from 'components/WalletFace'

type Props = {|
  +createWallet: Function,
  +importWallet: Function,
|}

const NewWalletButtons = ({
  createWallet,
  importWallet,
}: Props) => (
  <div className='new-wallet-buttons'>
    <div className='separator' />
    <div className='create'>
      <WalletFace
        onClick={createWallet}
        iconName='add'
        title={t`Create new wallet`}
        description={t`Create your own wallet to manage on-chain funds`}
        isTransparent
      />
    </div>
    <div className='import'>
      <WalletFace
        onClick={importWallet}
        iconName='import'
        title={t`Import wallet`}
        description={t`Import existing wallet to manage on-chain funds`}
        isTransparent
      />
    </div>
  </div>
)

export default NewWalletButtons
