// @flow

import React from 'react'

import JText from 'components/base/JText'
import WalletHeader from 'components/WalletHeader'
import NewWalletButtons from '../../../components/NewWalletButtons'

const WalletsStartView = ({ createWallet, importWallet }: Props) => (
  <div className='wallets-start-view'>
    <WalletHeader />
    <div className='content'>
      <div className='title'>
        <JText
          value='Create a new key pair or import an existing one to get started'
          size='title'
        />
      </div>
      <div className='buttons'>
        <NewWalletButtons createWallet={createWallet} importWallet={importWallet} />
      </div>
      <div className='terms'>
        <JText
          value={'By clicking "Create new" or "Import" I agree to Jibrel\'s Terms of Service'}
        />
      </div>
    </div>
  </div>
)

type Props = {
  createWallet: Function,
  importWallet: Function,
}

export default WalletsStartView
