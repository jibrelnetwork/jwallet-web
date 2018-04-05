// @flow

import React from 'react'

import { NewWalletButtons, WalletHeader } from 'components'

const Start = ({ createWallet, importWallet }: Props) => (
  <div className='content'>
    <div className='wallet-header-wrapper'>
      <WalletHeader />
    </div>
    <div className='new-wallet-content'>
      <div className='new-wallet-title'>
        {'Create a new key pair or import an existing one to get started'}
      </div>
      <NewWalletButtons createWallet={createWallet} importWallet={importWallet} />
    </div>
    <div className='new-wallet-terms'>
      {'By clicking "Create new" or "Import" I agree to Jibrel\'s Terms of Service'}
    </div>
  </div>
)

type Props = {
  createWallet: Function,
  importWallet: Function,
}

export default Start
