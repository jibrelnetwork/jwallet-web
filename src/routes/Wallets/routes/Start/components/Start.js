// @flow

import React from 'react'

import { KeyButton, WalletHeader } from 'components/__new__'

const Start = ({ createWallet, importWallet }: Props) => (
  <div className='content'>
    <div className='wallet-header-wrapper'>
      <WalletHeader />
    </div>
    <div className='new-wallet-content'>
      <div className='new-wallet-title'>
        {'Create a new key pair or import an existing one to get started'}
      </div>
      <div className='new-wallet-separator' />
      <div className='new-wallet-button-wrapper'>
        <KeyButton
          onClick={createWallet}
          icon='key-new'
          text='Some text about keys, mnemonic, address etc'
          title='Create new wallet'
        />
      </div>
      <div className='new-wallet-button-wrapper'>
        <KeyButton
          onClick={importWallet}
          icon='key-import'
          text='Some text about keys, mnemonic, address etc'
          title='Import wallet'
        />
      </div>
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
